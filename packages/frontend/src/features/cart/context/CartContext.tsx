import React, { createContext, useContext, useReducer, useEffect } from 'react'
import toast from 'react-hot-toast'

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartState }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | undefined>(undefined)

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      let newItems: CartItem[]
      
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
        toast.success(`Updated ${action.payload.name} quantity`)
      } else {
        newItems = [...state.items, action.payload]
        toast.success(`Added ${action.payload.name} to cart`)
      }

      return calculateTotals(newItems)
    }

    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.id === action.payload)
      const newItems = state.items.filter(item => item.id !== action.payload)
      if (item) {
        toast.success(`Removed ${item.name} from cart`)
      }
      return calculateTotals(newItems)
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      )
      return calculateTotals(newItems)
    }

    case 'CLEAR_CART':
      toast.success('Cart cleared')
      return { items: [], total: 0, itemCount: 0 }

    case 'LOAD_CART':
      return action.payload

    default:
      return state
  }
}

const calculateTotals = (items: CartItem[]): CartState => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { items, total, itemCount }
}

const CART_STORAGE_KEY = 'buzz_cart'

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, itemCount: 0 })

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        const parsed = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: parsed })
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
    }
  }, [])

  // Save cart to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Helper hooks
export const useCartActions = () => {
  const { dispatch } = useCart()

  return {
    addItem: (item: Omit<CartItem, 'quantity'>) => {
      dispatch({ type: 'ADD_ITEM', payload: { ...item, quantity: 1 } })
    },
    removeItem: (id: string) => {
      dispatch({ type: 'REMOVE_ITEM', payload: id })
    },
    updateQuantity: (id: string, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
    },
    clearCart: () => {
      dispatch({ type: 'CLEAR_CART' })
    },
  }
}