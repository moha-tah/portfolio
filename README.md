# Portfolio - Mohamed Tahiri

## Table of Contents

- [About](#about)
- [Technical Architecture](#technical-architecture)
- [Getting Started](#getting-started)
- [Development](#development)
- [Project Structure](#project-structure)
- [Available Commands](#available-commands)
- [Contributing](#contributing)

## About

This is the personal portfolio website of **Mohamed Tahiri**, a Computer Engineering student at UTC (Université de Technologie de Compiègne). The site serves as a comprehensive professional presentation showcasing his skills, experiences, and projects.

### Key Features

- **Professional Presentation**: Complete CV with timeline of academic and professional experiences
- **Project Showcase**: Interactive display of key projects including an online multiplayer game, distributed systems, and full-stack applications
- **Skills Portfolio**: Visual representation of technical competencies with proficiency levels and experience duration
- **Testimonials**: Professional references and feedback from colleagues and mentors
- **Contact System**: Secure contact form with anti-spam protection and automated notifications
- **Multilingual Support**: Full internationalization in English and French
- **FAQ Section**: Answers to common questions about experience and availability

## Technical Architecture

This project is built as a modern **Turbo monorepo** with two main applications:

### Frontend (`apps/front/`)

- **Hosting**: Vercel
- **Framework**: Next.js 15 with App Router and Turbopack
- **UI**: React 19 with TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui components
- **Animations**: Framer Motion for smooth interactions
- **Internationalization**: next-intl with locale-based routing
- **Theming**: Dark/light mode support with next-themes

### Backend (`apps/back/`)

- **Hosting**: Railway
- **Framework**: NestJS 11 with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Documentation**: Swagger/OpenAPI with Scalar UI
- **Security**: Rate limiting, Cloudflare Turnstile verification
- **Services**: Discord webhooks, Resend email service
- **Testing**: Jest with coverage reports

### Key Technologies

- **Package Manager**: pnpm with workspaces
- **Build System**: Turbo for task orchestration and caching
- **Language**: TypeScript throughout
- **Linting**: ESLint + Prettier
- **Git Hooks**: Husky for pre-commit quality checks
- **Node.js**: >=22.0.0 required

---

**Contact**: Mohamed Tahiri - [me@mohamedtahiri.com](mailto:me@mohamedtahiri.com)
