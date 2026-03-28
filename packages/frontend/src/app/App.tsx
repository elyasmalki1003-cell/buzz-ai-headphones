import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout'
import HomePage from '../features/home/HomePage'
import ProductDetailPage from '../features/product/pages/ProductDetailPage'
import CartPage from '../features/cart/pages/CartPage'
import CheckoutPage from '../features/checkout/pages/CheckoutPage'
import OrderConfirmationPage from '../features/checkout/pages/OrderConfirmationPage'
import AdminLayout from './layouts/AdminLayout'
import AdminDashboard from '../features/admin/pages/AdminDashboard'
import ProductManagementPage from '../features/admin/pages/ProductManagementPage'
import OrderManagementPage from '../features/admin/pages/OrderManagementPage'
import NotFound from '../shared/components/NotFound'
import { CartProvider } from '../features/cart/context/CartContext'

function App() {
  return (
    <CartProvider>
      <Toaster position="top-right" />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order-confirmation/:orderId" element={<OrderConfirmationPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductManagementPage />} />
          <Route path="orders" element={<OrderManagementPage />} />
        </Route>
      </Routes>
    </CartProvider>
  )
}

export default App