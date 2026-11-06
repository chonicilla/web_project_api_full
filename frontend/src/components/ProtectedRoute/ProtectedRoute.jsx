import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
  children,
  isLoggedIn,
  anonymous = false,
}) {
  const location = useLocation();

  if (anonymous && isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}
