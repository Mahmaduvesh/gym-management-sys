import { Navigate, Outlet } from "react-router-dom";

const ProtectedUserRoute = () => {
  const token = localStorage.getItem("userToken"); // ✅ store user token separately
  return token ? <Outlet /> : <Navigate to="/user-login" />;
};

export default ProtectedUserRoute;
