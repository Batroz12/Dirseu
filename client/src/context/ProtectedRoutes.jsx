// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

/**
 * ProtectedRoute Component
 * @param {React.Component} children - Componente a renderizar si el usuario está autorizado.
 * @param {Array} allowedRoles - Arreglo de roles permitidos para acceder a la ruta.
 * @returns Componente protegido o redirección.
 */
const ProtectedRoutes = ({ children, allowedRoles }) => {
  const auth = useAuth(); // Obtenemos el contexto de autenticación
  const location = useLocation(); // Obtenemos la ubicación actual

  const user = auth.getUser(); // Obtenemos el usuario autenticado
  const userAdmin = auth.isAdmin;
  if (userAdmin) {
    return children; // Si el usuario es admin, se le permite acceder a cualquier ruta
  }

  if (!auth.isAuthenticated) {
    // Si el usuario no está autenticado, redirigimos al login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    // Si el rol del usuario no está permitido, lo redirigimos a "No autorizado"
    return <Navigate to="/home/no-autorizado" replace />;
    // return <Navigate to="/home/no-autorizado" replace />;
  }

  // Si está autenticado y tiene el rol adecuado, renderizamos el componente hijo
  return children;
};

export default ProtectedRoutes;
