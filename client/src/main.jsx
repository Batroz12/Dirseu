import React from "react";
import ReactDOM from "react-dom/client";
// import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import ErrorPage from "./pages/ErrorPage";
import SignUp from "./pages/SignUp";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import { AuthProvider } from "./auth/AuthProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/SignIn",
    element: <SignIn />,
  },
  {
    path: "/SignUp",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Home",
        element: <Home />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
