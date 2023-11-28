import { NavLink, Outlet } from "react-router-dom";

const UserDashboard = () => {
  return (
    <div className="flex gap-10 w-10/12 mx-auto bg-red-200">
      <div className="w-64 min-h-full bg-slate-400">
        <button className="btn bg-blue-500 text-white">User Dashboard</button>

        <ul className="transition-all ease-in-out duration-300">
          <li>
            <button className="btn btn-primary">
              <NavLink to="/userDashboard/payment">Payment</NavLink>
            </button>
          </li>
          <li>
            <button className="btn btn-secondary">
              <NavLink to="/userDashboard/paymentHistory">Payment History</NavLink>
            </button>
          </li>
        </ul>
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default UserDashboard;
