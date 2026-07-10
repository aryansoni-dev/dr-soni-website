# Dr. Soni Advisory Landing Page

<div align="center">
  <img src="assets/dr-soni.png" alt="Dr. Soni brand asset" />
</div>

This project is a responsive single-page landing site for Dr. J. Soni, a life advisor and insurance consultant. It presents the advisor profile, service categories, partner insurers, testimonials, FAQs, and a consultation flow with Supabase-backed sync support.

## Tech Stack

- React 19 for the UI layer
- TypeScript for application and data typing
- Vite for local development and production builds
- Tailwind CSS 4 for utility-first styling and theme tokens
- Motion for page transitions, counters, and interactive animation
- Lucide React for icons
- Supabase JS for consultation and offline-sync diagnostics
- Express, dotenv, and Google GenAI are included in the workspace dependencies for supporting integrations and future expansion

## Project Structure

- `index.html` - Vite entry HTML
- `src/main.tsx` - React bootstrap and root mounting
- `src/App.tsx` - page composition and global state wiring
- `src/index.css` - theme tokens, typography, and shared animation styles
- `src/data.ts` - advisor profile, services, partner, and testimonial content
- `src/components/` - section components for the landing page
- `src/lib/supabase.ts` - Supabase client, consultation persistence, and offline fallback logic
- `assets/dr-soni.png` - local brand asset used for documentation and visual identity

The main page is composed from these sections:

- `Loader`
- `Navbar`
- `Hero`
- `About`
- `Services`
- `Partners`
- `Testimonials`
- `FAQ`
- `Contact`
- `Footer`
- `InteractiveFeatures`
- `SupabaseSyncPortal`

## What The App Does

- Shows a premium insurance-advisor landing experience with anchored navigation and animated content
- Lets visitors browse service offerings and partner coverage areas
- Highlights client testimonials and common questions
- Supports consultation capture through the contact flow and modal entry points
- Includes a Supabase diagnostics portal for checking table status and syncing offline consultation data

