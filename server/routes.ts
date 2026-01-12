import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema } from "@shared/schema";
import { ZodError } from "zod";
import { sendWelcomeEmail } from "./resend";
import { processIncomingEmail } from "./emailAI";
import { Webhook } from "svix";
import emailAddresses from "email-addresses";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // POST /api/waitlist - Add email to waitlist
  app.post("/api/waitlist", async (req, res) => {
    try {
      const data = insertWaitlistSchema.parse(req.body);
      
      // Check if email already exists
      const existing = await storage.getWaitlistByEmail(data.email);
      if (existing) {
        return res.status(200).json({ 
          message: "You're already on the list!",
          alreadyExists: true 
        });
      }
      
      // Add to database
      const result = await storage.addToWaitlist(data);
      
      // Send welcome email asynchronously in user's language (don't wait for it)
      sendWelcomeEmail(data.email, data.language || 'no').catch(err => {
        console.error('Failed to send welcome email (non-blocking):', err);
      });
      
      res.status(201).json({ 
        message: "Successfully added to waitlist!",
        data: result 
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ 
          message: "Invalid email format",
          errors: error.errors 
        });
      }
      console.error("Error adding to waitlist:", error);
      res.status(500).json({ message: "Failed to add to waitlist" });
    }
  });

  // GET /api/waitlist - Get all emails (for admin)
  app.get("/api/waitlist", async (_req, res) => {
    try {
      const emails = await storage.getAllWaitlistEmails();
      res.json(emails);
    } catch (error) {
      console.error("Error fetching waitlist:", error);
      res.status(500).json({ message: "Failed to fetch waitlist" });
    }
  });

  // POST /api/webhooks/email - Resend webhook for incoming emails
  app.post("/api/webhooks/email", async (req, res) => {
    try {
      // Verify webhook signature using Svix
      const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;
      
      if (!webhookSecret) {
        console.error("RESEND_WEBHOOK_SECRET is not configured - webhook rejected for security");
        return res.status(500).json({ error: "Webhook secret not configured" });
      }
      
      const wh = new Webhook(webhookSecret);
      const svixId = req.headers["svix-id"] as string;
      const svixTimestamp = req.headers["svix-timestamp"] as string;
      const svixSignature = req.headers["svix-signature"] as string;
      
      if (!svixId || !svixTimestamp || !svixSignature) {
        console.error("Missing Svix webhook headers");
        return res.status(401).json({ error: "Unauthorized: Missing signature headers" });
      }
      
      try {
        const rawBody = (req as any).rawBody?.toString() || JSON.stringify(req.body);
        wh.verify(rawBody, {
          "svix-id": svixId,
          "svix-timestamp": svixTimestamp,
          "svix-signature": svixSignature,
        });
      } catch (err) {
        console.error("Webhook signature verification failed:", err);
        return res.status(401).json({ error: "Unauthorized: Invalid signature" });
      }
      
      console.log("Received email webhook:", JSON.stringify(req.body, null, 2));
      
      const { type, data } = req.body;
      
      // Only process email.received events
      if (type === "email.received") {
        const { id, from, subject, text, html } = data;
        
        // Parse sender email using RFC-5322 compliant parser
        // Handles formats like:
        // - "sender@example.com"
        // - "Jane Doe <sender@example.com>"
        // - '"Jane, CFO" <cfo@example.com>'
        // - { email: "sender@example.com" }
        // - ["sender@example.com"]
        let fromEmail: string | undefined;
        
        const extractEmail = (input: unknown): string | undefined => {
          if (typeof input === "string") {
            // Use RFC-5322 compliant parser
            const parsed = emailAddresses.parseOneAddress(input);
            if (parsed && parsed.type === "mailbox") {
              return parsed.address;
            }
            // Fallback: try simple extraction
            const angleMatch = input.match(/<([^>]+)>/);
            if (angleMatch) {
              return angleMatch[1].trim();
            }
            // Could be bare email
            if (input.includes("@")) {
              return input.trim();
            }
            return undefined;
          } else if (input && typeof input === "object") {
            const obj = input as Record<string, unknown>;
            // Handle Resend format: { address: "email@domain.com", name: "Display Name" }
            if ("address" in obj && typeof obj.address === "string") {
              return obj.address;
            }
            // Handle alternative format: { email: "email@domain.com" }
            if ("email" in obj && typeof obj.email === "string") {
              return obj.email;
            }
          }
          return undefined;
        }
        
        if (Array.isArray(from) && from[0]) {
          fromEmail = extractEmail(from[0]);
        } else {
          fromEmail = extractEmail(from);
        }
        
        // Basic validation - just check it contains @ and a domain
        if (!fromEmail || !fromEmail.includes("@") || fromEmail.length < 5) {
          console.error("Invalid or missing sender email:", from, "-> parsed:", fromEmail);
          return res.status(200).json({ received: true, skipped: "Invalid sender email" });
        }
        
        // Use text content, fallback to stripped HTML if text is empty
        let emailContent = text;
        if (!emailContent && html) {
          // Basic HTML stripping - remove tags and decode common entities
          emailContent = html
            .replace(/<[^>]*>/g, ' ')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/\s+/g, ' ')
            .trim();
        }
        
        // If no content in webhook, we may need to fetch full email via Resend API
        // For now, use subject as fallback content
        if (!emailContent && id) {
          emailContent = `[Email received - content needs to be fetched via API. Email ID: ${id}]`;
          console.log(`Email webhook received without body content, email ID: ${id}`);
        }
        
        if (fromEmail && emailContent) {
          // Process email asynchronously (don't block webhook response)
          processIncomingEmail(fromEmail, subject || "No Subject", emailContent).catch(err => {
            console.error("Failed to process incoming email:", err);
          });
        }
      }
      
      // Always respond 200 to acknowledge receipt
      res.status(200).json({ received: true });
    } catch (error) {
      console.error("Error processing email webhook:", error);
      // Still return 200 to prevent retries
      res.status(200).json({ received: true, error: "Processing error" });
    }
  });

  return httpServer;
}
