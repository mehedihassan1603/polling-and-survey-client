import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../AuthProvider/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isUserDashboard, setIsUserDashboard] = useState(true);
  const [showAdminMessage, setShowAdminMessage] = useState(false);

  const switchToUserDashboard = () => {
    setIsUserDashboard(true);
    setShowAdminMessage(false); // Hide the admin message when switching to User Dashboard
  };

  const switchToAdminDashboard = () => {
    setIsUserDashboard(false);
    setShowAdminMessage(true); // Hide the admin message when switching to Admin Dashboard
  };

  // Show the admin message only when the user is not an admin and the message flag is set
  const showAdminMessageCondition = !isAdmin && showAdminMessage;

  return (
    <div className="flex gap-10 w-10/12 mx-auto bg-red-200">
      <div className="w-64 min-h-full bg-slate-400">
        <button
          className={`btn ${isUserDashboard ? "bg-blue-500" : "bg-gray-300"} text-white`}
          onClick={switchToUserDashboard}
        >
          User Dashboard
        </button>
        <button
          className={`btn ${!isUserDashboard ? "bg-blue-500" : "bg-gray-300"} text-white`}
          onClick={switchToAdminDashboard}
        >
          Admin Dashboard
        </button>

        {isUserDashboard && (
          <ul className="transition-all ease-in-out duration-300">
            <li>
              <button className="btn btn-primary">
                <NavLink to="/dashboard/home">Home</NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-secondary">
                <NavLink to="/dashboard/reservation">Reservation</NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-accent">
                <NavLink to="/dashboard/payment">Payment</NavLink>
              </button>
            </li>
          </ul>
        )}

        {!isUserDashboard && isAdmin && (
          <ul className="transition-all ease-in-out duration-300">
            <li>
              <button className="btn btn-primary">
                <NavLink to="/dashboard/surveycreation">Create Survey</NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-secondary">
                <NavLink to="/dashboard/admin">
                  Admin
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-secondary">
                <NavLink to="/dashboard/users">All Users</NavLink>
              </button>
            </li>
            {/* Add other admin-specific links here */}
          </ul>
        )}

        {showAdminMessageCondition && (
          <div className="mt-4">
            <p className="text-red-500">You do not have admin privileges.</p>
          </div>
        )}
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
