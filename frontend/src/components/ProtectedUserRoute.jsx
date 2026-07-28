import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoute = () => {
  const token = localStorage.getItem("userToken");

  return token ? <Outlet /> : <Navigate to="/user-login" replace />;
};

export default ProtectedUserRoute;