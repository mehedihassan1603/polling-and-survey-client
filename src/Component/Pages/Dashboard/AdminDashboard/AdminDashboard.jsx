import React, { useState } from 'react';

const AdminDashboard = () => {
  const [userFilter, setUserFilter] = useState('all'); // 'all', 'pro', 'normal', 'surveyor'
  const [surveyStatus, setSurveyStatus] = useState('published'); // 'published', 'unpublished'
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [surveyResponses, setSurveyResponses] = useState([]); // Assuming this is an array of survey responses

  const handleUserFilterChange = (filter) => {
    setUserFilter(filter);
    // Fetch and update user data based on the selected filter
  };

  const handleSurveyStatusChange = (status) => {
    setSurveyStatus(status);
    // Perform actions based on survey status change
  };

  const handleUnpublishSurvey = (surveyId) => {
    // Logic to unpublish survey and provide feedback
    setFeedbackMessage(`Survey ${surveyId} unpublished successfully.`);
  };

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
              <td className="border-b">{response.name}</td>
              <td className="border-b">{response.email}</td>
              <td className="border-b">{response.time}</td>
              <td className="border-b">{response.voted}</td>
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

      {/* Survey Status */}
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
      {feedbackMessage && <p className="text-green-600 mb-4">{feedbackMessage}</p>}

      {/* Payments of Pro Users */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Payments of Pro Users</h2>
        {/* Logic to display payments */}
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
