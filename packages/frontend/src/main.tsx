import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App'
import './styles/globals.css'

// Load Stripe asynchronously
const stripePromise = import('@stripe/stripe-js').then(({ loadStripe }) =>
  loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY || '')
)

// Export stripe promise for use in components
export { stripePromise }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)