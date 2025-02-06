import { Navigate, Outlet } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const ProtectedRoute = () => {
    const [user] = useLocalStorage("user");
    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
