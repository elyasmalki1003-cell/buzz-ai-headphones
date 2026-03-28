import { Router } from 'express'
import productRoutes from './productRoutes'
import orderRoutes from './orderRoutes'
import adminRoutes from './adminRoutes'
import webhookRoutes from './webhookRoutes'

const router = Router()

// API routes
router.use('/products', productRoutes)
router.use('/orders', orderRoutes)
router.use('/admin', adminRoutes)
router.use('/webhooks', webhookRoutes)

export default router