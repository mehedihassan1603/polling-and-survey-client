import { NavLink } from "react-router-dom";

const Dash = () => {
  return (
    <div>
      <div className="flex justify-center items-center mt-20 gap-10">
  <button className="bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-700 hover:to-emerald-900">
    <NavLink to="/dashboard/adminHome">Admin Dashboard</NavLink>
  </button>
  <button className="hover:text-white">
    <NavLink to="/surveyorDashboard">Surveyor Dashboard</NavLink>
  </button>
</div>

    </div>
  );
};

export default Dash;
