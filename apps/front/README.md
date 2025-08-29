# Frontend - Portfolio Application

## Table of Contents

- [Frontend - Portfolio Application](#frontend---portfolio-application)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Features](#features)
    - [User Experience](#user-experience)
    - [Content Sections](#content-sections)
    - [Technical Features](#technical-features)
  - [Technical Stack](#technical-stack)
    - [Core Technologies](#core-technologies)
    - [UI \& Styling](#ui--styling)
    - [Internationalization](#internationalization)
    - [Development Tools](#development-tools)
  - [Internationalization](#internationalization-1)
    - [URL Structure](#url-structure)
  - [API Integration](#api-integration)
    - [Type-Safe API Client](#type-safe-api-client)
    - [API Schema Generation](#api-schema-generation)
    - [Contact Form Integration](#contact-form-integration)

## About

This is the **frontend application** for Mohamed Tahiri's portfolio website. Built with Next.js 15 and React 19, it provides a modern, responsive, and multilingual user interface that showcases professional experience, projects, skills, and facilitates contact with potential employers.

The application serves as a comprehensive digital CV and portfolio, specifically designed to attract internship opportunities for a 6-month end-of-study placement starting in February 2026.

## Features

### User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Theme**: Automatic system preference detection with manual toggle
- **Smooth Animations**: Framer Motion for engaging user interactions
- **Fast Loading**: Next.js 15 with Turbopack for optimal performance
- **SEO Optimized**: Meta tags, OpenGraph, and sitemap generation

### Content Sections

- **Hero Section**: Dynamic introduction with animated passions and call-to-action
- **About Me**: Interactive timeline showcasing academic and professional journey
- **Projects**: Detailed project showcase with modal views and external links
- **Skills**: Visual skills representation with proficiency levels and experience duration
- **Testimonials**: Animated grid of professional references and recommendations
- **FAQ**: Frequently asked questions about experience and availability
- **Contact Form**: Secure contact system with Turnstile verification

### Technical Features

- **Multilingual Support**: Complete French/English localization with URL routing
- **Type Safety**: Full TypeScript implementation with strict mode
- **Component Library**: shadcn/ui components with Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation
- **API Integration**: Type-safe API client with automatic schema generation

## Technical Stack

### Core Technologies

- **Next.js 15**: React framework with App Router and Turbopack
- **React 19**: Latest React with concurrent features
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS v4**: Utility-first CSS framework with CSS variables

### UI & Styling

- **shadcn/ui**: High-quality component library with "new-york" style
- **Radix UI**: Unstyled, accessible component primitives
- **Lucide React**: Beautiful icon library
- **Framer Motion**: Animation library for smooth interactions
- **next-themes**: Dark/light mode implementation

### Internationalization

- **next-intl**: Powerful i18n solution for Next.js
- **Locale Routing**: URL-based language switching (`/en`, `/fr`, etc.)
- **Server/Client Rendering**: Full SSR and CSR support for translations
- **Type-safe Translations**: TypeScript integration for translation keys

### Development Tools

- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting with Tailwind plugin
- **Turbo**: Task orchestration and caching
- **pnpm**: Fast, disk-efficient package manager

## Internationalization

The application supports full internationalization with the following setup:

### URL Structure

- English: `https://mohamedtahiri.com/en/`
- French: `https://mohamedtahiri.com/fr/`
- Root redirects based on Accept-Language header if the user has no set a preferred language.

## API Integration

### Type-Safe API Client

The frontend uses `openapi-fetch` with automatically generated types from the backend Swagger schema:

```typescript
import { api } from '@/lib/api/client'

// Fully typed API calls
const response = await api.POST('/contact', {
  body: {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello!'
  }
})
```

### API Schema Generation

- Backend exports Swagger JSON
- Frontend generates TypeScript types automatically
- Development workflow includes automatic type updates

### Contact Form Integration

- Form validation with Zod schemas
- Turnstile CAPTCHA integration
- Error handling and user feedback
- Success states and notifications
