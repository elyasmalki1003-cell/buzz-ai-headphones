# Deployment Instructions

## Overview

This application consists of two main components:
1. **Frontend**: React application hosted on Vercel
2. **Backend**: Node.js API hosted on Railway or Render

## Prerequisites

- [GitHub](https://github.com) account
- [Vercel](https://vercel.com) account (free tier)
- [Railway](https://railway.app) or [Render](https://render.com) account (free tier)
- [Stripe](https://stripe.com) account (test mode)
- [Node.js](https://nodejs.org/) v22+ locally for development

## Step 1: Set Up GitHub Repository

1. **Create a new repository** on GitHub
2. **Push the code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/buzz-ai-headphones.git
   git push -u origin main
   ```

## Step 2: Configure Stripe

1. **Sign up** for Stripe if you haven't already
2. **Get your test keys**:
   - Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
   - Copy your **Publishable key** (starts with `pk_test_`)
   - Copy your **Secret key** (starts with `sk_test_`)
3. **Set up webhooks** (for production):
   - Go to **Developers → Webhooks**
   - Add endpoint: `https://your-backend-url/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
   - Copy the **Webhook secret** (starts with `whsec_`)

## Step 3: Deploy Backend (Railway)

### Option A: Railway (Recommended for simplicity)

1. **Create new project** on Railway
2. **Connect GitHub repository**
3. **Add environment variables**:
   ```
   PORT=3001
   DATABASE_URL="file:./dev.db"  # Railway will replace this with PostgreSQL
   STRIPE_SECRET_KEY=sk_test_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ADMIN_TOKEN=your_secure_admin_token_here
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.vercel.app
   ```
4. **Railway automatically**:
   - Detects the Node.js backend
   - Installs dependencies
   - Runs `prisma generate` and `prisma db push`
   - Starts the server

5. **Get your backend URL** from Railway dashboard (e.g., `https://buzz-backend.up.railway.app`)

### Option B: Render

1. **Create new Web Service** on Render
2. **Connect GitHub repository**
3. **Configure**:
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

4. **Add environment variables** (same as Railway)
5. **Add PostgreSQL database** (Free tier):
   - Create a new PostgreSQL instance
   - Get the connection string
   - Update `DATABASE_URL` with PostgreSQL connection string

6. **Get your backend URL** from Render (e.g., `https://buzz-backend.onrender.com`)

## Step 4: Deploy Frontend (Vercel)

1. **Import project** on Vercel
2. **Connect GitHub repository**
3. **Configure**:
   - **Framework Preset**: Vite
   - **Root Directory**: `packages/frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Add environment variables**:
   ```
   VITE_API_URL=https://your-backend-url.up.railway.app
   VITE_STRIPE_PUBLIC_KEY=pk_test_...
   VITE_ADMIN_TOKEN=dev_admin_token  # For development only
   ```

5. **Deploy** and get your frontend URL (e.g., `https://buzz-ai-headphones.vercel.app`)

## Step 5: Update Backend CORS

After deploying the frontend, update the backend's `FRONTEND_URL` environment variable to match your Vercel URL.

## Step 6: Database Setup

### For SQLite (development/local):
```bash
cd packages/backend
npx prisma db push
npx prisma db seed
```

### For PostgreSQL (production):
Railway/Render automatically creates and connects a PostgreSQL database. Prisma will use the connection string from `DATABASE_URL`.

## Step 7: Test Deployment

1. **Visit your frontend URL**
2. **Test the product page**
3. **Test adding to cart**
4. **Test checkout** (use Stripe test card: `4242 4242 4242 4242`)
5. **Test admin panel** at `/admin` with your admin token

## Environment Variables Reference

### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:3001              # Backend API URL
VITE_STRIPE_PUBLIC_KEY=pk_test_51...            # Stripe publishable key
VITE_ADMIN_TOKEN=dev_admin_token                # For admin access
```

### Backend (.env)
```env
PORT=3001                                       # Server port
DATABASE_URL="file:./dev.db"                    # SQLite for dev, PostgreSQL for prod
STRIPE_SECRET_KEY=sk_test_51...                 # Stripe secret key
STRIPE_WEBHOOK_SECRET=whsec_...                 # Stripe webhook secret
ADMIN_TOKEN=your_secure_admin_token_here        # Admin authentication
NODE_ENV=development                            # development/production
FRONTEND_URL=http://localhost:5173              # Frontend URL for CORS
```

## CI/CD Pipeline (GitHub Actions)

The repository includes a GitHub Actions workflow that:
1. **Runs tests** on every push
2. **Deploys to Vercel** automatically on push to main
3. **Deploys to Railway** automatically on push to main

To enable:
1. **Add secrets** to GitHub repository:
   - `VERCEL_TOKEN` (from Vercel account settings)
   - `RAILWAY_TOKEN` (from Railway account settings)
   - `STRIPE_SECRET_KEY` (for testing)
   - `ADMIN_TOKEN`

2. **The workflow file** `.github/workflows/deploy.yml` will handle the rest.

## Troubleshooting

### Backend won't start
- Check environment variables are set
- Check database connection
- Check Stripe keys are valid
- Check logs in Railway/Render dashboard

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS settings on backend
- Check network tab in browser DevTools

### Stripe payments failing
- Use test card `4242 4242 4242 4242`
- Check Stripe dashboard for errors
- Verify webhooks are configured (for production)

### Admin panel not working
- Verify `ADMIN_TOKEN` matches between frontend and backend
- Check authentication middleware

## Monitoring

### Backend Logs
- **Railway**: Dashboard → Project → Logs
- **Render**: Dashboard → Service → Logs

### Frontend Analytics
- **Vercel Analytics**: Built-in with Vercel
- **Custom**: Add Google Analytics or Plausible

### Error Tracking
- **Sentry**: Add Sentry SDK for error monitoring
- **Logging**: Backend uses Pino for structured logging

## Security Considerations

### Production Checklist
- [ ] Use strong `ADMIN_TOKEN` (generate with `openssl rand -hex 32`)
- [ ] Enable HTTPS everywhere
- [ ] Use production Stripe keys (live mode)
- [ ] Set up proper CORS origins
- [ ] Regular database backups
- [ ] Monitor for suspicious activity

### Secrets Management
- Never commit secrets to version control
- Use environment variables
- Rotate keys periodically
- Use different keys for development/production

## Scaling Considerations

### From MVP to Production
1. **Database**: Upgrade from SQLite to PostgreSQL
2. **Caching**: Add Redis for session/cart caching
3. **CDN**: Use Vercel's CDN for static assets
4. **Monitoring**: Add APM (Application Performance Monitoring)
5. **Backups**: Set up automated database backups

### High Traffic
1. **Horizontal scaling**: Add more backend instances
2. **Load balancer**: Use Railway/Render load balancing
3. **Database**: Add read replicas
4. **Caching**: Implement CDN for product images

## Support

For issues, check:
1. **Documentation** in `/docs` folder
2. **GitHub Issues** for known problems
3. **Stripe Documentation** for payment issues
4. **Vercel/Railway Documentation** for deployment issues