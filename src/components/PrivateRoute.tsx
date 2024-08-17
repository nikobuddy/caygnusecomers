// src/components/PrivateRoute.tsx
import { onAuthStateChanged } from "firebase/auth";
import React, { ReactNode, useEffect, useState } from "react";
import { Navigate, Route } from "react-router-dom";
import { auth } from "../firebaseConfig";

interface PrivateRouteProps {
  element: ReactNode;
  path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, path }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      path={path}
      element={isAuthenticated ? element : <Navigate to="/login" />}
    />
  );
};

export default PrivateRoute;
