import React from "react";
import { useAuth } from "../components/custom-hook/useAuth";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};
