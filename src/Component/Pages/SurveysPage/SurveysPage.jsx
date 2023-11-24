import React, { useState } from 'react';

const SurveysPage = () => {
  const [surveys, setSurveys] = useState([
    {
      title: "Employee Satisfaction Survey",
      shortDescription: "Share your thoughts on your overall satisfaction with the company.",
      totalVoted: 125,
      like: 85,
      dislike: 40,
      category: "Employee Engagement"
    },
    {
      title: "Health and Wellness Check",
      shortDescription: "Let us know if you are currently satisfied with the wellness programs provided.",
      totalVoted: 92,
      like: 70,
      dislike: 22,
      category: "Health and Wellness"
    },
    {
      title: "Website User Experience Survey",
      shortDescription: "Share your thoughts on the user experience to help us enhance our website.",
      totalVoted: 150,
      like: 120,
      dislike: 30,
      category: "User Experience"
    },
    // Add more surveys as needed
  ]);

  const [filters, setFilters] = useState({
    title: "All",
    category: "All",
    vote: "All"
  });

  const filterSurveys = () => {
    // Replace this logic with your own filtering implementation
    return surveys;
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
            {surveys.map(survey => (
              <option key={survey.title} value={survey.title}>{survey.title}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label className="mr-2">Category:</label>
          <select
            className="border p-1"
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="All">All</option>
            {surveys.map(survey => (
              <option key={survey.category} value={survey.category}>{survey.category}</option>
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
      </div>

      {/* Display Surveys */}
      <div>
        {filteredSurveys.map(survey => (
          <div key={survey.title} className="mb-8 p-4 border rounded">
            <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>
            <p className="mb-2">{survey.shortDescription}</p>
            <p>Total Voted: {survey.totalVoted}</p>
            <p>Likes: {survey.like}</p>
            <p>Dislikes: {survey.dislike}</p>
            <p>Category: {survey.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveysPage;
