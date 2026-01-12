import { type InsertWaitlist, type Waitlist, waitlist } from "@shared/schema";
import { eq } from "drizzle-orm";
import { db } from "./db";

// Re-export db for use in integrations
export { db };

export interface IStorage {
  addToWaitlist(email: InsertWaitlist): Promise<Waitlist>;
  getAllWaitlistEmails(): Promise<Waitlist[]>;
  getWaitlistByEmail(email: string): Promise<Waitlist | undefined>;
}

export class DatabaseStorage implements IStorage {
  async addToWaitlist(insertWaitlist: InsertWaitlist): Promise<Waitlist> {
    const [result] = await db.insert(waitlist).values(insertWaitlist).returning();
    return result;
  }

  async getAllWaitlistEmails(): Promise<Waitlist[]> {
    return await db.select().from(waitlist);
  }

  async getWaitlistByEmail(email: string): Promise<Waitlist | undefined> {
    const [result] = await db.select().from(waitlist).where(eq(waitlist.email, email));
    return result;
  }
}

export const storage = new DatabaseStorage();
