# Backend - Portfolio API

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technical Stack](#technical-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [API Documentation](#api-documentation)
- [Database](#database)
- [Services](#services)
- [Testing](#testing)

## About

This is the **backend API** for Mohamed Tahiri's portfolio website. Built with NestJS 11, it provides a robust REST API that powers the contact functionality, handles form submissions securely, and integrates with external services for notifications and email delivery.

The API serves as the backend foundation for the portfolio website, managing contact form submissions with comprehensive security measures, automated notifications, and seamless integration with third-party services.

## Features

### Core Functionality

- **Contact Form API**: Secure endpoint for handling contact form submissions
- **Rate Limiting**: Protection against spam with throttling (2 requests per hour per IP)
- **Security**: Cloudflare Turnstile verification for anti-bot protection
- **Data Persistence**: PostgreSQL database for storing contact form entries
- **Automated Notifications**: Real-time Discord webhooks and email notifications

### Technical Features

- **REST API**: Clean, documented endpoints following REST principles
- **Input Validation**: Comprehensive data validation with class-validator and Zod
- **Type Safety**: Full TypeScript implementation with strict mode
- **API Documentation**: Auto-generated Swagger/OpenAPI with interactive UI
- **Environment Configuration**: Secure environment variable management
- **Error Handling**: Structured error responses and logging

### Integration Services

- **Discord Webhooks**: Instant notifications to Discord channels
- **Resend Email Service**: Professional email delivery with React templates
- **Turnstile Verification**: Cloudflare CAPTCHA integration for security
- **Database Management**: Prisma ORM with migrations and type generation

## Technical Stack

### Core Technologies

- **NestJS 11**: Modern Node.js framework with decorators and dependency injection
- **Express.js**: HTTP server framework (NestJS default platform)
- **TypeScript**: Full type safety with strict configuration
- **PostgreSQL**: Relational database for data persistence
- **Prisma**: Modern database toolkit and ORM

### API & Documentation

- **Swagger/OpenAPI**: Auto-generated API specification
- **Scalar**: Interactive API documentation UI at `/docs`
- **class-validator**: Decorator-based validation for DTOs
- **class-transformer**: Object transformation and serialization

### External Services

- **Resend**: Email delivery service with React templates
- **Discord API**: Webhook notifications for real-time alerts
- **Cloudflare Turnstile**: CAPTCHA verification service
- **React Email**: HTML email template generation

### Development & Testing

- **Jest**: Testing framework with coverage reports
- **ESLint**: Code linting with TypeScript rules
- **Prettier**: Code formatting and style consistency
- **Husky**: Git hooks for quality assurance

### Development Workflow

1. **Hot Reload**: NestJS automatically restarts on file changes
2. **Type Safety**: TypeScript compilation errors are shown immediately
3. **API Documentation**: Swagger spec is auto-generated on startup
4. **Database Changes**: Use Prisma migrations for schema updates
5. **Testing**: Write tests alongside new features

## API Documentation

The API provides comprehensive documentation through Swagger/OpenAPI:

### Interactive Documentation

- **URL**: http://localhost:3000/docs
- **UI**: Scalar API reference with interactive testing
- **Specification**: Auto-generated from NestJS decorators and DTOs

### Available Endpoints

#### Contact Form

- **POST** `/contact` - Submit contact form
  - **Rate Limit**: 2 requests per hour per IP
  - **Validation**: Email, name, company, message, Turnstile token
  - **Response**: Contact form entry details
  - **Integrations**: Discord notification, email alert

### API Schema Generation

The backend automatically exports its OpenAPI specification to `swagger.json`, which the frontend uses for type generation:

```bash
# Generate types for frontend
pnpm swagger:generate
```

## Database

### Schema Overview

The database uses PostgreSQL with Prisma as the ORM:

```prisma
model ContactFormEntry {
  id        Int      @id @default(autoincrement())
  email     String
  name      String
  company   String
  message   String?
  createdAt DateTime @default(now())
}
```

### Database Operations

```bash
# Development workflow
pnpm db:push          # Quick schema sync (development)
pnpm db:migrate       # Create and run migrations (production)
pnpm db:studio        # Visual database browser
pnpm db:generate      # Update Prisma client types
```

### Migrations

- Migrations are stored in `prisma/migrations/`
- Use `pnpm db:migrate` to create and apply migrations
- Always review migration SQL before applying to production

## Services

### Discord Webhook Service

Sends real-time notifications to Discord channels when contact forms are submitted:

- **Integration**: Discord webhook URL configuration
- **Features**: Rich embeds with form data, error handling
- **Fallback**: Logs errors if webhook fails, doesn't block form submission

### Resend Email Service

Professional email delivery using React templates:

- **Templates**: React components in `src/emails/templates/`
- **Rendering**: Server-side HTML generation
- **Configuration**: API key and sender domain setup
- **Features**: HTML emails with professional styling

### Turnstile Security Service

Cloudflare CAPTCHA verification for anti-spam protection:

- **Integration**: Server-side token verification
- **Security**: Validates client-side challenges
- **Error Handling**: Clear error messages for invalid tokens
- **Rate Limiting**: Works alongside throttling for comprehensive protection

## Testing

### Test Structure

- **Unit Tests**: Individual service and controller testing
- **E2E Tests**: Full application integration testing
- **Coverage**: Comprehensive test coverage reporting
