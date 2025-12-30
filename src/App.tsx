import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout'
import Login from './pages/Login'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Checkout from './pages/Checkout'
import Products from './pages/Products'
import Productsdetail from './pages/Productsdetail'
import Wishlist from './pages/Wishlist'
import Accaount from './pages/Accaount'
import Register from './pages/Register'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Login /> },
        { path: "/home", element: <Home /> },
        { path: "/about", element: <About /> },
        { path: "/cart", element: <Cart /> },
        { path: "/contact", element: <Contact /> },
        { path: "/checkout", element: <Checkout /> },
        { path: "/products", element: <Products /> },
        { path: "/productsdetail/:id", element: <Productsdetail /> },
        { path: "/wishlist", element: <Wishlist /> },
        { path: "/account", element: <Accaount /> },
        { path: "/register", element: <Register /> }
      ]
    }
  ])

  return <RouterProvider router={router} />
}

export default App