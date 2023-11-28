import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../../AuthProvider/useAdmin";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../AuthProvider/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading || isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  if (user && isAdmin) {
    return children;
  }

  useEffect(() => {
    // Show the toast
    toast.success("You are not an Admin", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });

    // Delay the navigation for the toast to be visible
    setTimeout(() => {
      // Perform the navigation
      navigate("/", { state: { from: location }, replace: true });
    }, 3000); // Adjust the delay as needed
  }, [navigate, location]);

  

  return (
    <>
      <ToastContainer />
    </>
  );
};

export default AdminRoute;
