# Buzz AI Headphones E-commerce

A modern, full-featured e-commerce store for AI-powered noise-cancelling headphones. Built with React, TypeScript, Node.js, and Stripe.

## Features

- 🎧 **Product Detail Page** - Gallery, technical specs, reviews, FAQ
- 🛒 **Shopping Cart** - Add/remove items, quantity control, localStorage persistence
- 💳 **Secure Checkout** - Stripe Elements integration (test mode)
- 👑 **Admin Panel** - Product & order management
- 📱 **Responsive Design** - Mobile-first, Tailwind CSS
- 🔒 **Security** - PCI DSS compliant via Stripe, no PII storage
- ♿ **Accessibility** - WCAG 2.1 AA compliant
- 🧪 **Testing** - Unit tests (Vitest) & E2E tests (Playwright)

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- React Router
- React Hook Form + Zod
- Stripe.js + React Stripe.js

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- SQLite (MVP) / PostgreSQL (production)
- Stripe Node.js SDK

### Infrastructure
- Vercel (frontend hosting)
- Railway/Render (backend hosting)
- GitHub Actions (CI/CD)

## Getting Started

### Prerequisites
- Node.js >= 22
- pnpm >= 10
- Stripe account (test mode)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd buzz-ai-headphones
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp packages/frontend/.env.example packages/frontend/.env.local
   cp packages/backend/.env.example packages/backend/.env
   ```

4. **Initialize database**
   ```bash
   pnpm db:push
   pnpm db:seed
   ```

5. **Start development servers**
   ```bash
   pnpm dev
   # Or separately:
   # pnpm dev:frontend
   # pnpm dev:backend
   ```

6. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3001
   - Admin: http://localhost:5173/admin (token: `dev_admin_token`)

## Development Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start both frontend and backend |
| `pnpm build` | Build both projects |
| `pnpm test` | Run all tests |
| `pnpm lint` | Run ESLint on all projects |
| `pnpm format` | Format code with Prettier |
| `pnpm db:push` | Push Prisma schema to database |
| `pnpm db:seed` | Seed database with sample data |

## Project Structure

```
buzz-ai-headphones/
├── packages/
│   ├── frontend/     # React application
│   └── backend/      # Express API
├── scripts/          # Deployment scripts
├── docs/             # Documentation
└── .github/          # CI/CD workflows
```

## Testing

### Unit Tests
```bash
pnpm test:unit
```

### E2E Tests
```bash
pnpm test:e2e
```

### Accessibility Tests
```bash
pnpm test:a11y
```

## Deployment

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables:
   - `VITE_API_URL` = your backend API URL
   - `VITE_STRIPE_PUBLIC_KEY` = your Stripe publishable key
3. Deploy automatically on push to main

### Backend (Railway)
1. Create new Railway project
2. Connect GitHub repository
3. Set environment variables:
   - `DATABASE_URL` = PostgreSQL connection string (Railway provides)
   - `STRIPE_SECRET_KEY` = your Stripe secret key
   - `ADMIN_TOKEN` = secure admin token
4. Deploy automatically

## Environment Variables

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_ADMIN_TOKEN=dev_admin_token
```

### Backend (.env)
```env
PORT=3001
DATABASE_URL=file:./dev.db
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_TOKEN=admin_secret_token_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Database Schema

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed schema.

## API Documentation

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create order and Stripe payment intent
- `GET /api/orders/:id` - Get order details
- `GET /api/orders` - List orders (admin)

### Webhooks
- `POST /api/webhooks/stripe` - Handle Stripe events

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a pull request

## License

MIT