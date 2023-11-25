import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SurveysPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [filters, setFilters] = useState({
    title: "All",
    category: "All",
    vote: "All",
    sort: "All", // Default sorting order (desc for highest to lowest)
  });

  useEffect(() => {
    // Fetch survey data from the API using Axios
    axios
      .get("http://localhost:5000/survey")
      .then((response) => setSurveys(response.data))
      .catch((error) => console.error("Error fetching survey data:", error));
  }, []); // The empty dependency array ensures that the effect runs only once, similar to componentDidMount

  const filterSurveys = () => {
    // Replace this logic with your own filtering and sorting implementation
    let filteredData = [...surveys];

    if (filters.title !== "All") {
      filteredData = filteredData.filter(
        (survey) => survey.title === filters.title
      );
    }

    if (filters.category !== "All") {
      filteredData = filteredData.filter(
        (survey) => survey.category === filters.category
      );
    }

    if (filters.vote !== "All") {
      // Assuming you have a field like 'voteType' in your survey data
      filteredData = filteredData.filter(
        (survey) => survey.voteType === filters.vote
      );
    }

    // Sorting based on totalVoted
    filteredData.sort((a, b) => {
      const orderMultiplier = filters.sort === "asc" ? 1 : -1;
      return (a.totalVoted - b.totalVoted) * orderMultiplier;
    });

    return filteredData;
  };

  const filteredSurveys = filterSurveys();

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">Surveys Page</h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <div className="flex items-center">
          <label className="mr-2">Title:</label>
          <select
            className="border p-1"
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          >
            <option value="All">All</option>
            {surveys.map((survey) => (
              <option key={survey.title} value={survey.title}>
                {survey.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Category:</label>
          <select
            className="border p-1"
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="All">All</option>
            {surveys.map((survey) => (
              <option key={survey.category} value={survey.category}>
                {survey.category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Vote:</label>
          <select
            className="border p-1"
            onChange={(e) => setFilters({ ...filters, vote: e.target.value })}
          >
            <option value="All">All</option>
            <option value="Liked">Liked</option>
            <option value="Disliked">Disliked</option>
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Sort:</label>
          <select
            className="border p-1"
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
          >
            <option value="All">Select</option>
            <option value="desc">Highest to Lowest</option>
            <option value="asc">Lowest to Highest</option>
          </select>
        </div>
      </div>

      {/* Display Surveys */}
      <div>
        {filteredSurveys.map((survey) => (
          <div key={survey.title} className="mb-8 p-4 border rounded">
            <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>
            <p className="mb-2">{survey.shortDescription}</p>
            <p>Total Voted: {survey.totalVoted}</p>
            <p>Likes: {survey.like}</p>
            <p>Dislikes: {survey.dislike}</p>
            <p>Category: {survey.category}</p>
            <Link to={`/details/${survey._id}`}>
              <button className="text-lg rounded-lg card-hover mt-4 bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500">
                Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveysPage;
