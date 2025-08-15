# Rockam Data Services Website

## Overview

This is a modern React-based corporate website for Rockam Data Services Ltd, a data science and analytics outsourcing company. The application is built with a full-stack TypeScript architecture using React/Vite for the frontend and Express.js for the backend, featuring a comprehensive company website with service pages, industry focus areas, case studies, and contact functionality.

## User Preferences

Preferred communication style: Simple, everyday language.
Request: Deploy website to Vercel or Netlify instead of Replit hosting.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Client-side routing implemented with Wouter for lightweight navigation
- **UI Components**: Built on Radix UI primitives with shadcn/ui component library for consistent design
- **Styling**: Tailwind CSS with custom CSS variables for theming, featuring a blue primary color scheme
- **Animations**: Framer Motion for page transitions, scroll animations, and interactive elements
- **State Management**: React Query (TanStack Query) for server state management and API calls
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Server Framework**: Express.js with TypeScript for the REST API
- **Database ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Schema Validation**: Zod schemas shared between frontend and backend for consistent validation
- **Storage Interface**: Abstracted storage interface (IStorage) with in-memory implementation for development
- **API Endpoints**: RESTful API design with contact form submission endpoint

### Database Design
- **Users Table**: Basic user management with username/password fields
- **Contact Messages Table**: Stores contact form submissions with name, email, interest area, and message
- **Migration System**: Drizzle migrations stored in `/migrations` directory

### Development & Build Architecture
- **Monorepo Structure**: Shared TypeScript types and schemas between client and server
- **Development Server**: Vite dev server with Express API integration
- **Build Process**: Separate build processes for client (Vite) and server (esbuild)
- **Path Aliases**: Configured aliases for clean imports (@/ for client, @shared for shared code)

### Page Structure & Content Management
- **Multi-page Application**: Home, Services, Industries, How It Works, Case Studies, About, and Contact pages
- **Content Organization**: Centralized content management in `/data/content.ts` for easy updates
- **Component Architecture**: Reusable components for cards, modals, forms, and page sections
- **Responsive Design**: Mobile-first responsive design with Tailwind CSS

## External Dependencies

### Core Framework Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity optimized for serverless environments
- **drizzle-orm** and **drizzle-zod**: Type-safe ORM with automatic Zod schema generation
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for smooth transitions and interactions

### UI & Design Dependencies
- **@radix-ui/react-\***: Comprehensive set of accessible UI primitives (dialog, dropdown, form controls, etc.)
- **tailwindcss**: Utility-first CSS framework with custom configuration
- **@replit/vite-plugin-shadcn-theme-json**: Theme configuration integration for Replit environment
- **class-variance-authority** and **clsx**: Utility libraries for conditional CSS classes

### Form & Validation Dependencies
- **react-hook-form**: Performant form library with built-in validation
- **@hookform/resolvers**: Zod resolver integration for React Hook Form
- **zod**: TypeScript-first schema validation library

### Development & Build Dependencies
- **vite**: Fast build tool and development server
- **esbuild**: Fast JavaScript bundler for server-side code
- **tsx**: TypeScript execution environment for development
- **wouter**: Lightweight client-side routing library

### Business Context Dependencies
- **connect-pg-simple**: PostgreSQL session store (prepared for session management)
- **date-fns**: Date utility library for formatting and manipulation
- **react-icons**: Icon library providing social media and general purpose icons

## Deployment Configuration (August 15, 2025)

### Platform Support
The website is now configured for deployment on both Vercel and Netlify with the following changes:

### Vercel Configuration
- **vercel.json**: Configures serverless functions, routing, and build settings
- **API Functions**: Contact form endpoint moved to `/api/contact.ts` for Vercel serverless functions
- **Build Command**: `vite build` to generate static frontend
- **Output Directory**: `dist/public` for compiled assets

### Netlify Configuration  
- **netlify.toml**: Configures Netlify Functions, redirects, and build settings
- **Netlify Functions**: Contact form endpoint in `/netlify/functions/api.ts`
- **Build Command**: `vite build` for static site generation
- **Function Directory**: `netlify/functions` for serverless functions

### Dependencies Added
- **@vercel/node**: Vercel serverless function runtime support
- **@netlify/functions**: Netlify serverless function runtime support

### API Adaptations
- Contact form API adapted for serverless function architecture
- Maintained same validation and response structure
- In-memory storage for demo (production should use external database)
- CORS headers configured for cross-origin requests

### Build Process
- Frontend builds to `dist/public` directory
- Static assets served from build output
- API functions deployed separately as serverless functions
- Single Page Application routing handled via configuration files