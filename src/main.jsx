import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Layout from './Component/Layout/Layout.jsx';
import Home from './Component/Homepage/Home/Home.jsx';
import SurveysPage from './Component/Pages/SurveysPage/SurveysPage.jsx';
import SurveyDetailsPage from './Component/Pages/SurveyDetailsPage/SurveyDetailsPage.jsx';
import PricingPage from './Component/Pages/PricingPage/PricingPage.jsx';
import Dashboard from './Component/Layout/Dashboard/Dashboard.jsx';
import SurveyCreationPage from './Component/Pages/Dashboard/Surveyor/SurveyCreationPage.jsx';
import AdminDashboard from './Component/Pages/Dashboard/AdminDashboard/AdminDashboard.jsx';
import SurveyorDashboard from './Component/Pages/Dashboard/Surveyor Dashboard/SurveyorDashboard.jsx';
import UserDashboard from './Component/Pages/Dashboard/User Dashboard/UserDashboard.jsx';
import ProUserDashboard from './Component/Pages/Dashboard/Pro User Dashboard/ProUserDashboard.jsx';
import SurveyForm from './Component/Pages/Dashboard/Surveyor/SurveyForm.jsx';

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
        element:<SurveysPage></SurveysPage>
      },
      {
        path: "/details/:_id",
        loader: () => fetch("http://localhost:5000/survey"),
        element:<SurveyDetailsPage></SurveyDetailsPage>,
      },
      {
        path: "/pricing",
        element:<PricingPage></PricingPage>,
      }
    ]
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: 'surveycreation',
        element: <SurveyCreationPage></SurveyCreationPage>
      },
      {
        path: 'admin',
        element: <AdminDashboard></AdminDashboard>
      },
      {
        path: 'surveyor',
        element: <SurveyorDashboard></SurveyorDashboard>
      },
      {
        path: 'user',
        element: <UserDashboard></UserDashboard>
      },
      {
        path: 'prouser',
        element: <ProUserDashboard></ProUserDashboard>
      },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
