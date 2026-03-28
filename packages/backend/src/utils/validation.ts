import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().min(1, 'Description is required').max(2000),
  price: z.number().positive('Price must be positive'),
  images: z.array(z.string().url()).min(1, 'At least one image is required'),
  features: z.array(z.object({
    title: z.string(),
    icon: z.string(),
    description: z.string().optional(),
  })),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })).optional(),
  stock: z.number().int().nonnegative().default(100),
})

export const orderSchema = z.object({
  email: z.string().email('Invalid email'),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive(),
  })).min(1, 'At least one item is required'),
  shippingAddress: z.object({
    name: z.string().min(1, 'Name is required'),
    address: z.string().min(1, 'Address is required'),
    city: z.string().min(1, 'City is required'),
    country: z.string().min(1, 'Country is required'),
    postalCode: z.string().min(1, 'Postal code is required'),
  }),
})

export const adminAuthSchema = z.object({
  token: z.string().min(1, 'Token is required'),
})

export const validate = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
      throw new Error(`Validation failed: ${message}`)
    }
    throw error
  }
}