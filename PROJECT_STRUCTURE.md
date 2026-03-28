# Project Structure

## Root Structure
```
buzz-ai-headphones/
├── packages/
│   ├── frontend/          # React + Vite + Tailwind
│   └── backend/           # Node.js + Express + Prisma
├── scripts/               # Deployment & utility scripts
├── docs/                  # Documentation
├── .github/               # GitHub Actions workflows
├── docker-compose.yml     # Local development
├── package.json           # Root package.json (pnpm workspaces)
├── pnpm-workspace.yaml    # Workspace configuration
└── README.md
```

## Frontend Structure (`packages/frontend/`)
```
frontend/
├── public/
│   ├── favicon.ico
│   ├── logo.png
│   └── images/            # Static product images
├── src/
│   ├── app/
│   │   ├── layouts/
│   │   │   ├── MainLayout.tsx
│   │   │   └── AdminLayout.tsx
│   │   ├── routers/
│   │   │   ├── AppRouter.tsx
│   │   │   └── routes.ts
│   │   └── store/
│   │       ├── cartStore.ts
│   │       └── productStore.ts
│   ├── features/
│   │   ├── product/
│   │   │   ├── components/
│   │   │   │   ├── ProductGallery.tsx
│   │   │   │   ├── ProductDetails.tsx
│   │   │   │   ├── ProductReviews.tsx
│   │   │   │   └── ProductFAQ.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useProduct.ts
│   │   │   │   └── useProductReviews.ts
│   │   │   ├── types.ts
│   │   │   ├── api.ts
│   │   │   └── index.ts
│   │   ├── cart/
│   │   │   ├── components/
│   │   │   │   ├── CartItem.tsx
│   │   │   │   ├── CartSummary.tsx
│   │   │   │   └── CartIcon.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useCart.ts
│   │   │   ├── utils/
│   │   │   │   └── storage.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── checkout/
│   │   │   ├── components/
│   │   │   │   ├── CheckoutForm.tsx
│   │   │   │   ├── PaymentForm.tsx
│   │   │   │   └── OrderConfirmation.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useCheckout.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   ├── admin/
│   │   │   ├── components/
│   │   │   │   ├── ProductForm.tsx
│   │   │   │   ├── ProductList.tsx
│   │   │   │   └── OrderList.tsx
│   │   │   ├── hooks/
│   │   │   │   └── useAdmin.ts
│   │   │   ├── types.ts
│   │   │   └── index.ts
│   │   └── shared/
│   │       ├── components/
│   │       │   ├── Header.tsx
│   │       │   ├── Footer.tsx
│   │       │   ├── Button.tsx
│   │       │   ├── Input.tsx
│   │       │   ├── LoadingSpinner.tsx
│   │       │   ├── ErrorBoundary.tsx
│   │       │   └── NotFound.tsx
│   │       ├── hooks/
│   │       │   ├── useLocalStorage.ts
│   │       │   └── useApi.ts
│   │       ├── utils/
│   │       │   ├── format.ts
│   │       │   ├── validation.ts
│   │       │   └── constants.ts
│   │       └── types/
│   │           ├── index.ts
│   │           └── api.ts
│   ├── styles/
│   │   ├── globals.css
│   │   └── tailwind.css
│   └── main.tsx
├── index.html
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vitest.config.ts
├── playwright.config.ts
├── .env.example
└── package.json
```

## Backend Structure (`packages/backend/`)
```
backend/
├── src/
│   ├── app/
│   │   ├── middlewares/
│   │   │   ├── auth.ts
│   │   │   ├── validation.ts
│   │   │   ├── error.ts
│   │   │   └── cors.ts
│   │   ├── controllers/
│   │   │   ├── productController.ts
│   │   │   ├── orderController.ts
│   │   │   ├── adminController.ts
│   │   │   └── webhookController.ts
│   │   ├── services/
│   │   │   ├── productService.ts
│   │   │   ├── orderService.ts
│   │   │   ├── stripeService.ts
│   │   │   └── adminService.ts
│   │   ├── repositories/
│   │   │   ├── productRepository.ts
│   │   │   ├── orderRepository.ts
│   │   │   └── baseRepository.ts
│   │   ├── routes/
│   │   │   ├── productRoutes.ts
│   │   │   ├── orderRoutes.ts
│   │   │   ├── adminRoutes.ts
│   │   │   ├── webhookRoutes.ts
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   ├── logger.ts
│   │   │   ├── validation.ts
│   │   │   └── helpers.ts
│   │   └── server.ts
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── types/
│       ├── index.ts
│       └── stripe.ts
├── tests/
│   ├── unit/
│   │   ├── controllers/
│   │   ├── services/
│   │   └── utils/
│   └── integration/
│       ├── api/
│       └── setup.ts
├── .env.example
├── package.json
├── tsconfig.json
├── nodemon.json
└── vitest.config.ts
```

## Database Schema (Prisma)

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Decimal  @db.Decimal(10, 2)
  images      String[] // JSON array of image URLs
  features    Json     // JSON array of { title: string, icon: string }
  faq         Json     // JSON array of { question: string, answer: string }
  stock       Int      @default(100)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Order {
  id          String   @id @default(cuid())
  email       String
  total       Decimal  @db.Decimal(10, 2)
  status      OrderStatus @default(PENDING)
  items       OrderItem[]
  stripePaymentId String?
  shippingAddress Json
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model OrderItem {
  id        String   @id @default(cuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product  @relation(fields: [productId], references: [id])
  productId String
  quantity  Int
  price     Decimal  @db.Decimal(10, 2)
}

enum OrderStatus {
  PENDING
  PAID
  SHIPPED
  DELIVERED
  CANCELLED
}
```

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_ADMIN_TOKEN=dev_admin_token
```

### Backend (.env)
```
PORT=3001
DATABASE_URL=file:./dev.db
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
ADMIN_TOKEN=admin_secret_token_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Development Setup

1. **Install dependencies**: `pnpm install`
2. **Database setup**: `pnpm db:push` (generates SQLite DB)
3. **Seed data**: `pnpm db:seed` (adds sample products)
4. **Start backend**: `pnpm dev:backend`
5. **Start frontend**: `pnpm dev:frontend`
6. **Run tests**: `pnpm test`

## Deployment

### Frontend (Vercel)
- Connect GitHub repository
- Set environment variables
- Automatic deployment on push

### Backend (Railway/Render)
- Connect GitHub repository
- Set environment variables
- Auto-deploy on push to main

### Database
- SQLite file included in deployment (Railway ephemeral storage)
- For production: Migrate to PostgreSQL with Railway PostgreSQL plugin