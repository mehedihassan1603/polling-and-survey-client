import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "https://polling-survey-server-two.vercel.app/",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  // request interceptor to add authorization header for every secure call to teh api
  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    // console.log('request stopped by interceptors', token)
    config.headers.authorization = `Bearer ${token}`;
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

  axiosSecure.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
    //   console.log("error tracked in the interceptor", error.response);
      if (error.response.status === 401 || error.response.status === 403) {
        console.log("logout the user");
        logOut()
          .then(() => {
            navigate("/login");
          })
          .catch((error) => console.log(error));
      }
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
