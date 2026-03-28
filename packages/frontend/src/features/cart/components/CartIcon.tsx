import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CartIcon = () => {
  const { state } = useCart()

  return (
    <Link
      to="/cart"
      className="relative p-2 hover:bg-neutral-100 rounded-lg transition-colors"
      aria-label={`Shopping cart with ${state.itemCount} items`}
    >
      <ShoppingCart className="h-6 w-6 text-neutral-700" />
      {state.itemCount > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-xs font-bold text-white">
          {state.itemCount > 9 ? '9+' : state.itemCount}
        </span>
      )}
    </Link>
  )
}

export default CartIcon