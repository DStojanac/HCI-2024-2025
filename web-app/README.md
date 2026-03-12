# Cooksy 🍳

A modern recipe sharing and management web application built with Next.js 15, featuring a headless CMS for content management, user authentication, and personalized recipe collections.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Sanity CMS Setup](#sanity-cms-setup)
- [Authentication](#authentication)
- [Available Scripts](#available-scripts)

## 🌟 Overview

Cooksy is a full-stack web application designed to make cooking accessible and enjoyable for everyone. Users can browse a curated collection of recipes, read cooking-related blog posts, create accounts, and save their favorite recipes for easy access.

The application uses a headless CMS architecture with Sanity for content management, allowing administrators to easily create and manage recipes and blog content through an intuitive studio interface.

## ✨ Features

- **Recipe Browse & Search**: Explore a comprehensive collection of recipes with detailed information
- **Recipe Details**: View cooking time, servings, ingredients, instructions, meal types, and difficulty levels
- **User Authentication**: Secure signup and login system with session management
- **Favorites System**: Save and organize favorite recipes (for authenticated users)
- **Blog Platform**: Read cooking tips, techniques, and culinary insights
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Content Management**: Admin-friendly Sanity Studio for managing recipes and blog posts
- **Protected Routes**: User account management with protected pages
- **Modern UI**: Clean, intuitive interface built with Radix UI components and Tailwind CSS

## 🛠 Tech Stack

### Frontend

- **Framework**: [Next.js 15.1.5](https://nextjs.org/) (React 19)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API

### Backend

- **Authentication**: [NextAuth.js v5](https://next-auth.js.org/) (Auth.js)
- **Database**: PostgreSQL
- **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
- **CMS**: [Sanity](https://www.sanity.io/)
- **Password Hashing**: bcryptjs

## 📁 Project Structure

```
web-app/
├── public/
│   └── images/          # Static assets (meal type images, etc.)
├── src/
│   ├── actions/         # Server actions (login, signup, favorites, etc.)
│   ├── app/            # Next.js App Router pages
│   │   ├── (auth)/     # Authentication pages (login, signup)
│   │   ├── (main)/     # Public pages (home, recipes, blog, about)
│   │   ├── (protected)/ # Protected pages (account)
│   │   └── api/        # API routes (NextAuth)
│   ├── components/     # React components
│   │   ├── layout/     # Layout components (Header, Footer, Hero, etc.)
│   │   └── ui/         # Reusable UI components (Button, Card, etc.)
│   ├── contexts/       # React contexts (Favorites context)
│   ├── db/            # Database configuration and schema
│   │   ├── index.ts    # Database instance
│   │   ├── schema.ts   # Drizzle schema definitions
│   │   └── migrations/ # Database migrations
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility functions and validations
│   ├── sanity/        # Sanity CMS configuration
│   │   ├── lib/       # Sanity client and queries
│   │   └── schemaTypes/ # Content type definitions (recipe, blog, author)
│   ├── auth.ts        # Authentication setup
│   ├── auth.config.ts # Authentication configuration
│   ├── middleware.ts  # Next.js middleware (route protection)
│   └── routes.ts      # Route definitions
├── drizzle.config.ts  # Drizzle ORM configuration
├── sanity.config.ts   # Sanity Studio configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── package.json       # Project dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 10.5.2 or higher
- PostgreSQL database
- Sanity account (for CMS)

### Installation

1. **Clone the repository**

   ```bash
   cd web-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root of the `web-app` directory (see [Environment Variables](#environment-variables))

4. **Set up the database**

   ```bash
   npm run db:push
   # or run migrations
   npm run db:migrate
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔐 Environment Variables

Create a `.env` file in the `web-app` directory with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/cooksy_db"

# NextAuth.js
AUTH_SECRET="your-auth-secret-key"
# Generate with: openssl rand -base64 32

# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
SANITY_API_TOKEN="your-api-token"
```

## 🗄 Database Setup

The application uses PostgreSQL with Drizzle ORM. The database schema includes:

### Tables

**users**

- `id` (UUID, primary key)
- `name` (varchar)
- `email` (text, unique)
- `password` (text, hashed)
- `role` (enum: user, admin)
- `image` (text, optional)

**favorites**

- `id` (UUID, primary key)
- `userId` (text, foreign key)
- `recipeId` (text, Sanity document reference)

### Running Migrations

```bash
# Generate migrations
npx drizzle-kit generate

# Apply migrations
npx drizzle-kit migrate

# Open Drizzle Studio (database GUI)
npx drizzle-kit studio
```

## 📝 Sanity CMS Setup

Sanity is used as a headless CMS for managing recipes and blog content.

### Content Types

1. **Recipe**
   - Title, slug, description
   - Main image
   - Cooking time, servings
   - Ingredients, instructions
   - Meal type, difficulty level
   - Author reference

2. **Blog Post**
   - Title, slug, description
   - Main image
   - Content (rich text)
   - Author reference
   - Published date

3. **Author**
   - Name, slug
   - Bio, image

### Accessing Sanity Studio

Once the development server is running, access the Sanity Studio at:

```
http://localhost:3000/studio
```

This interface allows you to create, edit, and manage all content.

## 🔒 Authentication

The application uses NextAuth.js v5 (Auth.js) with a custom credentials provider:

- **Signup**: Users can create accounts with name, email, and password
- **Login**: Email and password authentication
- **Session Management**: Secure session handling with JWT
- **Password Security**: Passwords are hashed using bcryptjs
- **Protected Routes**: Middleware-based route protection
- **Role-Based Access**: User and admin roles supported

### Authentication Flow

1. User signs up via `/signup` → credentials stored in PostgreSQL
2. User logs in via `/login` → session created
3. Protected routes check authentication status via middleware
4. User can access account page and favorite recipes when authenticated

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint

# Database
npx drizzle-kit generate  # Generate migrations
npx drizzle-kit migrate   # Run migrations
npx drizzle-kit studio    # Open database GUI
```

## 📄 License

This project is created for educational purposes as part of the HCI course at the University.

---
