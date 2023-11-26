import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Layout from "./Component/Layout/Layout.jsx";
import Home from "./Component/Homepage/Home/Home.jsx";
import SurveysPage from "./Component/Pages/SurveysPage/SurveysPage.jsx";
import SurveyDetailsPage from "./Component/Pages/SurveyDetailsPage/SurveyDetailsPage.jsx";
import PricingPage from "./Component/Pages/PricingPage/PricingPage.jsx";
import Dashboard from "./Component/Layout/Dashboard/Dashboard.jsx";
import SurveyCreationPage from "./Component/Pages/Dashboard/Surveyor/SurveyCreationPage.jsx";
import AdminDashboard from "./Component/Pages/Dashboard/AdminDashboard/AdminDashboard.jsx";
import SurveyorDashboard from "./Component/Pages/Dashboard/Surveyor Dashboard/SurveyorDashboard.jsx";
import UserDashboard from "./Component/Pages/Dashboard/User Dashboard/UserDashboard.jsx";
import ProUserDashboard from "./Component/Pages/Dashboard/Pro User Dashboard/ProUserDashboard.jsx";
import SurveyForm from "./Component/Pages/Dashboard/Surveyor/SurveyForm.jsx";
import Register from "./Component/Register/Login/Register/Register.jsx";
import AuthProvider from "./Component/AuthProvider/AuthProvider.jsx";
import Login from "./Component/Register/Login.jsx";
import PrivateRoute from "./Component/AuthProvider/PrivateRoute/PrivateRoute.jsx";
import AllUsers from "./Component/Pages/Dashboard/All Users/AllUsers.jsx";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/surveys",
        element: <SurveysPage></SurveysPage>,
      },
      {
        path: "/details/:_id",
        loader: () => fetch("http://localhost:5000/survey"),
        element: <SurveyDetailsPage></SurveyDetailsPage>,
      },
      {
        path: "/pricing",
        element: <PricingPage></PricingPage>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        path: "surveycreation",
        element: <SurveyCreationPage></SurveyCreationPage>,
      },
      {
        path: "admin",
        element: <AdminDashboard></AdminDashboard>,
      },
      {
        path: "users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "surveyor",
        element: <SurveyorDashboard></SurveyorDashboard>,
      },
      {
        path: "user",
        element: <UserDashboard></UserDashboard>,
      },
      {
        path: "prouser",
        element: <ProUserDashboard></ProUserDashboard>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
);
