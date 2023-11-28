
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../AuthProvider/useAdmin";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  

  
  return (
    <div className="flex gap-10 w-10/12 mx-auto bg-red-200">
      <div className="w-64 min-h-full bg-slate-400">
        
        <button
          className={`btn bg-blue-500 text-white`}
          
        >
          Admin Dashboard
        </button>

        { isAdmin ? (
          <ul className="transition-all ease-in-out duration-300">
            <li>
              <button className="btn btn-primary">
                <NavLink to="/dashboard/surveycreation">Create Survey</NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-secondary">
                <NavLink to="/dashboard/admin" activeClassName="bg-blue-500">
                  Admin
                </NavLink>
              </button>
            </li>
            <li>
              <button className="btn btn-secondary">
                <NavLink to="/dashboard/users">All Users</NavLink>
              </button>
            </li>
            
          </ul>
        )
        :
        (
          <p>Loading for Admin Permission</p>
        )}
      </div>
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
