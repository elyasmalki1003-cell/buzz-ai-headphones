import { Request, Response, NextFunction } from 'express'
import { AppError } from './error'

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new AppError(401, 'Authorization header missing or invalid')
  }

  const token = authHeader.substring(7) // Remove 'Bearer ' prefix
  const adminToken = process.env.ADMIN_TOKEN

  if (!adminToken) {
    throw new AppError(500, 'Server configuration error')
  }

  if (token !== adminToken) {
    throw new AppError(403, 'Invalid admin token')
  }

  next()
}