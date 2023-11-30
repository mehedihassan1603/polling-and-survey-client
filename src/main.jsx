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
import Dash from "./Component/Layout/Dashboard/Dash.jsx";
import AdminRoute from "./Component/Pages/Dashboard/AdminDashboard/AdminRoute.jsx";
import Payment from "./Component/Pages/Dashboard/Payment/Payment.jsx";
import PaymentHistory from "./Component/Pages/Dashboard/Payment/PaymentHistory.jsx";
import AdminHome from "./Component/Pages/Dashboard/AdminDashboard/AdminHome.jsx";

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
        element: <PrivateRoute><SurveyDetailsPage></SurveyDetailsPage></PrivateRoute>,
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
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "surveycreation",
        element: <SurveyCreationPage></SurveyCreationPage>,
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <AdminDashboard></AdminDashboard>
          </AdminRoute>
        ),
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
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "prouser",
        element: <ProUserDashboard></ProUserDashboard>,
      },
      {
        path: "dash",
        element: <Dash></Dash>,
      },
    ],
  },
  {
    path: "userDashboard",
    element: <UserDashboard></UserDashboard>,
    children: [
      {
        path: "payment",
        element: <Payment></Payment>,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory></PaymentHistory>,
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
