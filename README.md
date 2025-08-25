# Doner House - Restaurant Dynamic Menu System

A modern, mobile-first restaurant website with a dynamic menu management system built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

- **Dynamic Menu Display**: Mobile-optimized menu with categories and items
- **Admin Dashboard**: Hidden admin panel accessible via `/admin` URL
- **Category Management**: Add, edit, and remove menu categories with icons
- **Menu Item Management**: Full CRUD operations for menu items with image uploads
- **Image Upload**: AWS S3 integration for storing menu item images
- **Responsive Design**: Mobile-first approach with Doner House branding
- **Database**: PostgreSQL with Prisma ORM

## Pages

- **Home** (`/`): Landing page with featured items
- **Menu** (`/menu`): Dynamic menu display with categories
- **About Us** (`/about`): Restaurant information
- **Franchise** (`/franchise`): Franchise opportunities
- **Admin Dashboard** (`/admin`): Hidden admin panel for menu management

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- AWS S3 bucket for image storage

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/doner_house?schema=public"

# NextAuth (for future authentication)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# AWS S3
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_REGION="us-east-1"
AWS_S3_BUCKET_NAME="your-bucket-name"
```

3. Setup the database:
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed initial data (categories and sample menu items)
npm run prisma:seed
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the website

## Admin Access

- Navigate to `/admin` to access the admin dashboard
- Default admin credentials (if authentication is implemented):
  - Email: admin@donerhouse.com
  - Password: admin123

## Initial Categories

The seed script creates the following categories:
- Doner (with kebab icon)
- Burger (with burger icon)
- Pizza (with pizza icon)
- Beverages (with drinks icon)
- Pasta (with noodles icon)
- Side Dishes (with fries icon)

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom Doner House branding
- **Database**: PostgreSQL with Prisma ORM
- **Image Storage**: AWS S3
- **Icons**: React Icons (GiIcons for food categories)

## Branding

The website follows the Doner House brand guidelines:
- **Colors**: 
  - Deep Red (#A43F42)
  - Vermillion (#E75625)
  - Amber (#FDB719)
  - Charcoal Black (#171717)
  - Off-White (#F4F4F5)
- **Typography**: Impact/Bronco font family for headings

## Project Structure

```
src/
├── app/
│   ├── admin/          # Admin dashboard pages
│   ├── api/            # API routes
│   ├── menu/           # Menu display page
│   ├── about/          # About page
│   ├── franchise/      # Franchise page
│   └── page.tsx        # Home page
├── components/
│   ├── admin/          # Admin components
│   ├── layout/         # Header and Footer
│   └── menu/           # Menu display components
├── lib/
│   ├── prisma.ts       # Prisma client
│   ├── s3.ts          # S3 utilities
│   └── icons.ts       # Category icon mapping
└── prisma/
    ├── schema.prisma   # Database schema
    └── seed.ts        # Seed script
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Future Enhancements

- Authentication system for admin dashboard
- Order management system
- Customer reviews
- Multi-language support
- Online ordering integration