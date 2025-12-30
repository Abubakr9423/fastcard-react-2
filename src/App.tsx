import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("./pages/Layout"));
const Login = lazy(() => import("./pages/Login"));
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Products = lazy(() => import("./pages/Products"));
const Productsdetail = lazy(() => import("./pages/Productsdetail"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Accaount = lazy(() => import("./pages/Accaount"));
const Register = lazy(() => import("./pages/Register"));

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Layout />
        </Suspense>
      ),
      children: [
        { index: true, element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense> },
        { path: "/home", element: <Suspense fallback={<div>Loading...</div>}><Home /></Suspense> },
        { path: "/about", element: <Suspense fallback={<div>Loading...</div>}><About /></Suspense> },
        { path: "/cart", element: <Suspense fallback={<div>Loading...</div>}><Cart /></Suspense> },
        { path: "/contact", element: <Suspense fallback={<div>Loading...</div>}><Contact /></Suspense> },
        { path: "/checkout", element: <Suspense fallback={<div>Loading...</div>}><Checkout /></Suspense> },
        { path: "/products", element: <Suspense fallback={<div>Loading...</div>}><Products /></Suspense> },
        { path: "/productsdetail/:id", element: <Suspense fallback={<div>Loading...</div>}><Productsdetail /></Suspense> },
        { path: "/wishlist", element: <Suspense fallback={<div>Loading...</div>}><Wishlist /></Suspense> },
        { path: "/account", element: <Suspense fallback={<div>Loading...</div>}><Accaount /></Suspense> },
        { path: "/register", element: <Suspense fallback={<div>Loading...</div>}><Register /></Suspense> }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;