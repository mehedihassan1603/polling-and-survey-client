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
        path: "/surveydetails",
        element:<SurveyDetailsPage></SurveyDetailsPage>,
      },
      {
        path: "/pricing",
        element:<PricingPage></PricingPage>,
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
