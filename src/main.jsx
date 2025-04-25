import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import ProductDetailPage from "./components/ProductDetailPage.jsx";
import CheckoutPage from "./components/CheckOutPage.jsx";
import ProductListingPage from "./components/ProductListingPage.jsx";
import CartPage from "./components/CartPage.jsx";
import AuthPage from "./components/AuthPage.jsx";
import { NotificationProvider } from "./components/NotificationContext.jsx";
import Layout from "./Layout.jsx";
import AdminDashboard from "./components/dashboard.jsx";

// Create a wrapper component that uses the layout
const LayoutWrapper = () => {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const router = createBrowserRouter([
  {
    element: <LayoutWrapper />, // This will wrap all child routes
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/product",
        element: <ProductDetailPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/products",
        element: <ProductListingPage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "/dashboard",
        element: <AdminDashboard />,
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
      <RouterProvider router={router} />
    </NotificationProvider>
  </StrictMode>
);
