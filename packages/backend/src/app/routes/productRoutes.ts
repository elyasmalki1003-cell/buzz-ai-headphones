import { Router } from 'express'
import { ProductService } from '../services/productService'
import { validate } from '../../utils/validation'
import { productSchema } from '../../utils/validation'
import { authenticateAdmin } from '../middlewares/auth'

const router = Router()
const productService = new ProductService()

// GET /api/products - List all products
router.get('/', async (req, res, next) => {
  try {
    const products = await productService.getAllProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// GET /api/products/:id - Get product by ID
router.get('/:id', async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// POST /api/products - Create product (admin only)
router.post('/', authenticateAdmin, async (req, res, next) => {
  try {
    const validatedData = validate(productSchema, req.body)
    const product = await productService.createProduct(validatedData)
    res.status(201).json(product)
  } catch (error) {
    next(error)
  }
})

// PUT /api/products/:id - Update product (admin only)
router.put('/:id', authenticateAdmin, async (req, res, next) => {
  try {
    const validatedData = validate(productSchema, req.body)
    const product = await productService.updateProduct(req.params.id, validatedData)
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (error) {
    next(error)
  }
})

// DELETE /api/products/:id - Delete product (admin only)
router.delete('/:id', authenticateAdmin, async (req, res, next) => {
  try {
    const success = await productService.deleteProduct(req.params.id)
    if (!success) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default router