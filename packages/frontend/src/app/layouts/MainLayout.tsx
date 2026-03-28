import { Outlet } from 'react-router-dom'
import Header from '../../shared/components/Header'
import Footer from '../../shared/components/Footer'
import { Suspense } from 'react'
import LoadingSpinner from '../../shared/components/LoadingSpinner'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout