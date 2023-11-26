import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = true;
  return (
    <div className="flex gap-10 w-10/12 mx-auto bg-red-200">
      <div className="w-64 min-h-full bg-slate-400">
        <ul>
          {isAdmin ? (
            <>
              <li>
                <button className="btn btn-primary">
                  <NavLink to="/dashboard/surveycreation">
                    Create Survey
                  </NavLink>
                </button>
              </li>
              <li>
                <button className="btn btn-secondary">
                  <NavLink to="/dashboard/admin">Admin</NavLink>
                </button>
              </li>
              <li>
                <button className="btn btn-secondary">
                  <NavLink to="/dashboard/users">All USers</NavLink>
                </button>
              </li>
              <li>
                <button className="btn btn-accent">
                  <NavLink to="/dashboard/surveyor">Surveyor</NavLink>
                </button>
              </li>
              <li>
                <button className="btn btn-success">
                  <NavLink to="/dashboard/user">User</NavLink>
                </button>
              </li>
              <li>
                <button className="btn btn-info">
                  <NavLink to="/dashboard/prouser">Pro User</NavLink>
                </button>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="w-full">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
