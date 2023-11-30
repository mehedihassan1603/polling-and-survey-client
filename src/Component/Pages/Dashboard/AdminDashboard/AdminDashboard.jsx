import React, { useEffect, useState } from "react";
import useAdmin from "../../../AuthProvider/useAdmin";
import useAxiosSecure from "../../../AuthProvider/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import AllPayments from "./AllPayments";
import moment from "moment/moment";

const AdminDashboard = () => {
  const [userFilter, setUserFilter] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [surveyStatus, setSurveyStatus] = useState("published");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();


  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/users");
        console.log(res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      } finally {
        setLoading(false); // Set loading to false whether the request succeeds or fails
      }
    },
  });

  const { data: survey = [] } = useQuery({
    queryKey: ["survey"],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get("/survey");
        console.log(res.data);
        return res.data;
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      } finally {
        setLoading(false); // Set loading to false whether the request succeeds or fails
      }
    },
  });
  useEffect(() => {
    setSurveyResponses(survey); // Move the setSurveyResponses call here
  }, [survey]);

  useEffect(() => {
    // Filter users based on the selected role when the component mounts
    handleUserFilterChange(userFilter);
  }, []); // Empty dependency array to run the effect only once when the component mounts

  const handleUserFilterChange = (filter) => {
    setUserFilter(filter);

    // Filter users based on the selected role
    switch (filter) {
      default:
        setFilteredUsers(users);
        break
      case 'pro':
        setFilteredUsers(users.filter(user => user.role === 'Pro-User'));
        break;
      case 'normal':
        setFilteredUsers(users.filter(user => !user.role));
        break;
      case 'surveyor':
        setFilteredUsers(users.filter(user => user.role === 'surveyor'));
        break;
    }
  };

  const handleSurveyStatusChange = (status) => {
    setSurveyStatus(status);
    // Perform actions based on survey status change
  };

  const handleUnpublishSurvey = (surveyId) => {
    // Logic to unpublish survey and provide feedback
    setFeedbackMessage(`Survey ${surveyId} unpublished successfully.`);
  };
  if (loading) {
    // Render a loader while the data is being fetched
    return <div>Loading...</div>;
  }


  // Assuming surveyResponses is an array of objects with properties name, email, time, and voted
  const renderSurveyResponsesTable = () => {
    return (
      <table className="min-w-full bg-white border border-gray-300">
        {/* Table headers */}
        <thead>
          <tr>
            <th className="border-b">Name</th>
            <th className="border-b">Email</th>
            <th className="border-b">Time</th>
            <th className="border-b">Voted</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {surveyResponses.map((response, index) => (
            <tr key={index}>
              <td className="border-b">{response.title}</td>
              <td className="border-b">{response.email}</td>
              <td className="border-b">
                {moment(response.date).format('MMMM Do YYYY, h:mm:ss a')}
                {/* Adjust the format according to your requirements */}
              </td>
              <td className="border-b">{response.totalVote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

  // Chart component can be added based on your chart library (e.g., Chart.js)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* User Filter System */}
      <div className="mb-8">
        <label className="mr-4">Filter Users:</label>
        <select
          value={userFilter}
          onChange={(e) => handleUserFilterChange(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="all">All Users</option>
          <option value="pro">Pro Users</option>
          <option value="normal">Normal Users</option>
          <option value="surveyor">Surveyors</option>
        </select>
      </div>

      <div>
        <div className="flex justify-evenly my-4">
          <h2 className="text-3xl">Filtered Users</h2>
          <h2 className="text-3xl">Total Users: {filteredUsers.length}</h2>
        </div>

        {loading ? (
        <div className="text-4xl mt-20">Loading data Please wait...</div>
      ) : (
        <div>
          <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </div>
      )}



        
      </div>
    

    
      <div className="mb-8">
        <label className="mr-4">Survey Status:</label>
        <select
          value={surveyStatus}
          onChange={(e) => handleSurveyStatusChange(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>
      </div>

      {/* Unpublish Feedback */}
      {feedbackMessage && (
        <p className="text-green-600 mb-4">{feedbackMessage}</p>
      )}

      {/* Payments of Pro Users */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Payments of Pro Users</h2>
        <AllPayments></AllPayments>
      </div>

      {/* Survey Responses Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Survey Responses</h2>
        {renderSurveyResponsesTable()}
      </div>

      {/* Chart Component */}
      {/* Include your chart component here */}
    </div>
  );
};

export default AdminDashboard;
