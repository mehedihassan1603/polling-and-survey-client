// File: FeaturedSurveys.js
import React, { useState, useEffect } from 'react';

const FeaturedSurveys = () => {
  const [featuredSurveys, setFeaturedSurveys] = useState([]);

  useEffect(() => {
    // Simulating API call to fetch featured surveys
    // Replace this with actual API call using fetch or a library like axios
    const fetchFeaturedSurveys = async () => {
      try {
        // Assume the API returns an array of survey objects with vote counts
        const response = await fetch('/api/featured-surveys');
        const data = await response.json();
        setFeaturedSurveys(data);
      } catch (error) {
        console.error('Error fetching featured surveys:', error);
      }
    };

    fetchFeaturedSurveys();
  }, []);

  return (
    <div>
      <h2>Featured Surveys - Most Voted (Top 6)</h2>
      {featuredSurveys.slice(0, 6).map((survey) => (
        <div key={survey.id}>
          <h3>{survey.title}</h3>
          <p>Vote Count: {survey.voteCount}</p>
          {/* Display other survey details as needed */}
        </div>
      ))}
    </div>
  );
};

export default FeaturedSurveys;
