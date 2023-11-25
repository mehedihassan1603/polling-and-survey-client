import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="flex gap-10 w-10/12 mx-auto bg-red-200">
            <div className="w-64 min-h-full bg-slate-400">
                <h1>hello</h1>
                <h1>hello</h1>
                <h1>hello</h1>
                <h1>hello</h1>
                <h1>hello</h1>
                <h1>hello</h1>
                <h1>hello</h1>
                <h1>hello</h1>
            </div>
            <div className="w-full">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;