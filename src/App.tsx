import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

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
const NotFound = lazy(() => import("./pages/NotFound"));
// const Text = lazy(() => import("./pages/text"));

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <CircularProgress size={80} />
  </div>
);

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <Layout />
        </Suspense>
      ),
      children: [
        { index: true, element: <Suspense fallback={<Loader />}><Login /></Suspense> },
        { path: "/home", element: <Suspense fallback={<Loader />}><Home /></Suspense> },
        { path: "/about", element: <Suspense fallback={<Loader />}><About /></Suspense> },
        { path: "/cart", element: <Suspense fallback={<Loader />}><Cart /></Suspense> },
        { path: "/contact", element: <Suspense fallback={<Loader />}><Contact /></Suspense> },
        { path: "/checkout", element: <Suspense fallback={<Loader />}><Checkout /></Suspense> },
        { path: "/products", element: <Suspense fallback={<Loader />}><Products /></Suspense> },
        { path: "/productsdetail/:id", element: <Suspense fallback={<Loader />}><Productsdetail /></Suspense> },
        { path: "/wishlist", element: <Suspense fallback={<Loader />}><Wishlist /></Suspense> },
        { path: "/account", element: <Suspense fallback={<Loader />}><Accaount /></Suspense> },
        { path: "/register", element: <Suspense fallback={<Loader />}><Register /></Suspense> },
        { path: "/notfound", element: <Suspense fallback={<Loader />}><NotFound /></Suspense> },
        // { path: "/test", element: <Suspense fallback={<Loader />}><Text /></Suspense> }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default App;