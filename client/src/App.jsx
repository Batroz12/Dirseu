import React from "react";
import { useAuth } from "./auth/AuthProvider.jsx";

import { Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";

import Home from "./pages/Home.jsx";
import Analytics from "./pages/Analytics.jsx";
import Modules from "./pages/Modules.jsx";
import FormTaller from "./pages/FormTaller.jsx";
import ListModule from "./pages/ListModule.jsx";
import Administrator from "./pages/Administrator.jsx";

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="sigin" element={<SignIn />} errorElement={<ErrorPage />} />

      <Route element={<ProtectedRoute validate={isAuthenticated} to="sigin" />}>
        <Route path="" element={<Home />}>
          <Route path="" element={<Modules />}>
            <Route path="list/:module/:table" element={<ListModule />} />
          </Route>
          <Route path="analytics" element={<Analytics />} />
          <Route path="administrator" element={<Administrator />} />
        </Route>
      </Route>
    </Routes>
  );
}
