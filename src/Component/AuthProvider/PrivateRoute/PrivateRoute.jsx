import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../AuthProvider";

const PrivateRoute = ({ children, allowedRoles }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <span><progress className="progress w-56"></progress></span>;
    }

    if (user) {
        // Check if the user has the required role
        if (!allowedRoles || allowedRoles.includes(user.role)) {
            return children;
        } else {
            // User does not have the required role
            return <Navigate state={location.pathname} to="/unauthorized" replace />;
        }
    }

    // User is not authenticated
    return <Navigate state={location.pathname} to="/login" replace />;
};

export default PrivateRoute;
