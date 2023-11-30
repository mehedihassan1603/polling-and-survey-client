import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SurveysPage = () => {
  const [surveys, setSurveys] = useState([]);
  const [filters, setFilters] = useState({
    title: "All",
    category: "All",
    vote: "All",
    sort: "All", 
  });

  useEffect(() => {
    axios
      .get("https://polling-survey-server-two.vercel.app/survey")
      .then((response) => setSurveys(response.data))
      .catch((error) => console.error("Error fetching survey data:", error));
  }, []); 
  const getUniqueCategories = () => {
    const uniqueCategories = [...new Set(surveys.map((survey) => survey.category))];
    return ["All", ...uniqueCategories];
  };

  const filterSurveys = () => {
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
      filteredData = filteredData.filter(
        (survey) => survey.voteType === filters.vote
      );
    }
    filteredData.sort((a, b) => {
      const orderMultiplier = filters.sort === "asc" ? 1 : -1;
      return (a.totalVoted - b.totalVoted) * orderMultiplier;
    });

    return filteredData;
  };

  const filteredSurveys = filterSurveys();
  const uniqueCategories = getUniqueCategories();
  const getRandomColor = () => {
    const colors = ["bg-blue-200", "bg-green-200", "bg-yellow-200", "bg-pink-200", "bg-purple-200"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">Surveys Page</h1>

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
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category}
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

      <div className="grid grid-cols-2 gap-4">
        {filteredSurveys.map((survey, index) => (
          <div
            key={survey.title}
            className={`p-4 border rounded ${
              index % 2 === 0 ? "bg-blue-200" : "bg-green-200"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>
            <p className="mb-2">Description: {survey.description}</p>
            <p>Total Voted: {survey.totalVote}</p>
            <p>Likes: {survey.like}</p>
            <p>Dislikes: {survey.dislike}</p>
            <p>Category: {survey.category}</p>
            <Link to={`/details/${survey._id}`}>
              <button className="text-lg rounded-lg card-hover mt-4 bg-gradient-to-r from-slate-700 via-black to-slate-700 py-2 px-4 text-white">
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
