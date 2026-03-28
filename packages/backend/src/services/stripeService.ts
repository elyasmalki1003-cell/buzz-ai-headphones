import Stripe from 'stripe'
import { logger } from '../utils/logger'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined')
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
})

export interface CreatePaymentIntentParams {
  amount: number // in cents
  email: string
  metadata?: Record<string, string>
}

export interface PaymentIntentResult {
  clientSecret: string
  paymentIntentId: string
  amount: number
}

export class StripeService {
  static async createPaymentIntent(params: CreatePaymentIntentParams): Promise<PaymentIntentResult> {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: params.amount,
        currency: 'usd',
        receipt_email: params.email,
        metadata: params.metadata || {},
        automatic_payment_methods: {
          enabled: true,
        },
      })

      logger.info(`Created payment intent ${paymentIntent.id} for ${params.email}`)

      return {
        clientSecret: paymentIntent.client_secret!,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
      }
    } catch (error) {
      logger.error('Failed to create payment intent:', error)
      throw new Error('Failed to create payment intent')
    }
  }

  static async verifyWebhookSignature(payload: string | Buffer, signature: string) {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not defined')
    }

    try {
      return stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET)
    } catch (error) {
      logger.error('Webhook signature verification failed:', error)
      throw new Error('Invalid webhook signature')
    }
  }

  static async retrievePaymentIntent(paymentIntentId: string) {
    try {
      return await stripe.paymentIntents.retrieve(paymentIntentId)
    } catch (error) {
      logger.error(`Failed to retrieve payment intent ${paymentIntentId}:`, error)
      throw new Error('Failed to retrieve payment intent')
    }
  }
}

export default StripeService