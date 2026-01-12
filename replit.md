# SuntValg - Landing Page

## Overview

SuntValg is a multilingual landing page for a Norwegian mobile nutrition app that helps users scan food products, understand ingredients, and make healthier food choices. The application is a waitlist collection site for an upcoming mobile app launch, featuring AI-powered customer service via email.

The project is built as a full-stack TypeScript application with a React frontend and Express backend, designed for deployment on Replit.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **Styling**: Tailwind CSS v4 with shadcn/ui component library (New York style)
- **State Management**: TanStack React Query for server state
- **Animations**: Framer Motion for scroll animations and transitions
- **Internationalization**: i18next supporting 4 languages (Norwegian, English, Polish, Russian)
- **Build Tool**: Vite with custom plugins for Replit integration

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL
- **API Pattern**: RESTful JSON API with `/api` prefix
- **Email Service**: Resend for transactional emails (welcome emails, AI responses)
- **AI Integration**: OpenAI API via Replit AI Integrations for customer service chatbot

### Key Design Patterns
- **Monorepo Structure**: Client (`client/`), server (`server/`), and shared code (`shared/`)
- **Schema-First**: Database schema defined in `shared/schema.ts` using Drizzle, with Zod validation via drizzle-zod
- **Path Aliases**: `@/` for client source, `@shared/` for shared code, `@assets/` for attached assets

### Database Schema
- **waitlist**: Stores email signups with language preference
- **emailConversations**: Tracks AI customer service email threads
- **emailMessages**: Individual messages within conversations
- **conversations/messages**: Chat storage for AI integrations

### Development vs Production
- Development: Vite dev server with HMR, proxied through Express
- Production: Static files served from `dist/public`, single Express server

## External Dependencies

### Third-Party Services
- **PostgreSQL**: Primary database (requires `DATABASE_URL` environment variable)
- **Resend**: Email delivery service (requires `RESEND_API_KEY`)
- **OpenAI**: AI responses via Replit AI Integrations (uses `AI_INTEGRATIONS_OPENAI_API_KEY` and `AI_INTEGRATIONS_OPENAI_BASE_URL`)
- **PostHog**: Analytics (optional, with GDPR-compliant consent banner)
- **Google Tag Manager**: Additional analytics tracking (placeholder ID)

### Key NPM Packages
- UI: Radix UI primitives, Lucide icons, class-variance-authority
- Forms: React Hook Form with Zod resolvers
- Date handling: date-fns
- HTTP: Native fetch with TanStack Query
- Email parsing: email-addresses package for webhook processing

### Environment Variables Required
- `DATABASE_URL`: PostgreSQL connection string
- `RESEND_API_KEY`: For sending emails
- `RESEND_WEBHOOK_SECRET`: For webhook signature verification (required for email AI)
- `AI_INTEGRATIONS_OPENAI_API_KEY`: OpenAI API key (auto-managed by Replit)
- `AI_INTEGRATIONS_OPENAI_BASE_URL`: OpenAI API base URL (auto-managed by Replit)

### AI Email Customer Service
The system automatically responds to incoming emails from waitlist subscribers:
1. Webhook endpoint: `POST /api/webhooks/email` receives Resend inbound emails
2. Webhook signature verification using Svix ensures only authentic Resend events are processed
3. RFC-5322 compliant email parsing handles various sender formats
4. AI responses generated in user's preferred language (detected from waitlist registration)
5. Conversation history stored in database for context-aware responses

Setup in Resend:
1. Enable "Inbound Emails" in Resend dashboard for your domain
2. Create webhook pointing to `https://suntvalg.app/api/webhooks/email`
3. Select "email.received" event type
4. Copy webhook signing secret to RESEND_WEBHOOK_SECRET environment variable

### Database Commands
- `npm run db:push`: Push schema changes to database using Drizzle Kit