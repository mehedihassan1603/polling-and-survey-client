import { NavLink, Outlet, useLocation } from "react-router-dom";

const UserDashboard = () => {
  const location = useLocation();
  return (
    <div className="flex gap-10 w-10/12 mx-auto bg-red-200">
      <div className="w-64 min-h-screen bg-slate-400">
        <button className=" bg-blue-500 text-white ">
          User Payment Dashboard
        </button>

        <ul className="transition-all ease-in-out duration-300 mt-10 flex flex-col gap-10">
          <li>
            <NavLink
              to="/userDashboard/payment"
              className={`mt-6 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-300 px-4 py-2 rounded-md shadow-lg ${
                location.pathname === "/userDashboard/payment"
                  ? "bg-gradient-to-r from-red-500 via-red-700 to-red-500 text-white"
                  : ""
              }`}
            >
              Payment
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/userDashboard/paymentHistory"
              className={`mt-6 bg-gradient-to-r from-blue-300 via-sky-200 to-blue-300 px-4 py-2 rounded-md shadow-lg ${
                location.pathname === "/userDashboard/paymentHistory"
                  ? "bg-gradient-to-r from-red-500 via-red-700 to-red-500 text-white"
                  : ""
              }`}
            >
              Payment History
            </NavLink>
          </li>
          <div className="divider divider-neutral"></div>
            <li>
              <a href="/" class="group cursor-pointer flex h-min ring-none items-center justify-center hover:opacity-95 disabled:opacity-50  rounded-lg py-2 px-4 font-dm focus:outline-none !ring-transparent text-violet-800 border border-violet-500 border-b-violet-400 border-b-4 hover:border active:border bg-white hover:text-violet-900 hover:bg-gray-50  active:bg-gray-100 active:text-violet-600 focus-visible:outline-violet-600 focus-visible:ring-violet-700 text-sm sm:text-base">
                <span class="ml-3">Home</span>
              </a>
            </li>
            <li>
              <a class="group cursor-pointer flex h-min ring-none items-center justify-center hover:opacity-95 disabled:opacity-50  rounded-lg py-2 px-4 font-dm focus:outline-none !ring-transparent text-violet-800 border border-violet-500 border-b-violet-400 border-b-4 hover:border active:border bg-white hover:text-violet-900 hover:bg-gray-50  active:bg-gray-100 active:text-violet-600 focus-visible:outline-violet-600 focus-visible:ring-violet-700 text-sm sm:text-base">
                <span class="ml-3">ALL SURVEY</span>
              </a>
            </li>
            <li>
              <a class="group cursor-pointer flex h-min ring-none items-center justify-center hover:opacity-95 disabled:opacity-50  rounded-lg py-2 px-4 font-dm focus:outline-none !ring-transparent text-violet-800 border border-violet-500 border-b-violet-400 border-b-4 hover:border active:border bg-white hover:text-violet-900 hover:bg-gray-50  active:bg-gray-100 active:text-violet-600 focus-visible:outline-violet-600 focus-visible:ring-violet-700 text-sm sm:text-base">
                <span class="ml-3">CONTACT</span>
              </a>
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
