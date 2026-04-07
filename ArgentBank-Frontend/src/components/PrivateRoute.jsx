// PrivateRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * Empêche l'accès aux pages protégées si l'utilisateur
 * n'est pas authentifié (isLoggedIn = false).
 */
export default function PrivateRoute({ children }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  // Si pas connecté → redirection vers /login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Sinon → on affiche la page protégée
  return children;
}
