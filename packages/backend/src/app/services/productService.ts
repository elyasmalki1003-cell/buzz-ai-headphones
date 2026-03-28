import { PrismaClient } from '@prisma/client'
import { logger } from '../../utils/logger'

const prisma = new PrismaClient()

export interface CreateProductInput {
  name: string
  description: string
  price: number
  images: string[]
  features: Array<{ title: string; icon: string; description?: string }>
  faq?: Array<{ question: string; answer: string }>
  stock?: number
}

export class ProductService {
  async getAllProducts() {
    try {
      const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
      })
      logger.info(`Retrieved ${products.length} products`)
      return products
    } catch (error) {
      logger.error('Failed to get products:', error)
      throw error
    }
  }

  async getProductById(id: string) {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      })
      if (product) {
        logger.info(`Retrieved product ${id}`)
      }
      return product
    } catch (error) {
      logger.error(`Failed to get product ${id}:`, error)
      throw error
    }
  }

  async createProduct(data: CreateProductInput) {
    try {
      const product = await prisma.product.create({
        data: {
          ...data,
          faq: data.faq || [],
        },
      })
      logger.info(`Created product ${product.id}`)
      return product
    } catch (error) {
      logger.error('Failed to create product:', error)
      throw error
    }
  }

  async updateProduct(id: string, data: Partial<CreateProductInput>) {
    try {
      const product = await prisma.product.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      })
      logger.info(`Updated product ${id}`)
      return product
    } catch (error) {
      logger.error(`Failed to update product ${id}:`, error)
      throw error
    }
  }

  async deleteProduct(id: string) {
    try {
      await prisma.product.delete({
        where: { id },
      })
      logger.info(`Deleted product ${id}`)
      return true
    } catch (error) {
      logger.error(`Failed to delete product ${id}:`, error)
      return false
    }
  }
}