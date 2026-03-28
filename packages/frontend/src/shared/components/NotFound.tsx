import { Link } from 'react-router-dom'
import { Home, Headphones } from 'lucide-react'
import Button from './Button'

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <div className="inline-flex items-center justify-center p-4 bg-primary-100 rounded-full mb-6">
          <Headphones className="h-12 w-12 text-primary-600" />
        </div>
        <h1 className="text-4xl font-bold text-neutral-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-neutral-700 mb-6">Page Not Found</h2>
        <p className="text-neutral-600 mb-8">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back to amazing sound.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button variant="outline">
            <Link to="/#products">
              Browse Products
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default NotFound