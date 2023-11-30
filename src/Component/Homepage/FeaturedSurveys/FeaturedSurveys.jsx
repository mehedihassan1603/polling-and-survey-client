import React, { useState, useEffect } from 'react';

const FeaturedSurveys = () => {
  const [featuredSurveys, setFeaturedSurveys] = useState([]);

  useEffect(() => {
    const fetchFeaturedSurveys = async () => {
      try {
        const response = await fetch('https://polling-survey-server-two.vercel.app/survey');
        const data = await response.json();
        // Sort surveys by totalVote in descending order
        const sortedSurveys = data.sort((a, b) => b.totalVote - a.totalVote);
        setFeaturedSurveys(sortedSurveys);
      } catch (error) {
        console.error('Error fetching featured surveys:', error);
      }
    };

    fetchFeaturedSurveys();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold mb-4 text-white bg-slate-700 py-3">Featured Surveys - Most Voted (Top 6)</h2>
      <div className="grid grid-cols-2 gap-4">
        {featuredSurveys.slice(0, 6).map((survey) => (
          <div key={survey._id} className="p-4 border border-gray-300 rounded">
            <h3 className="text-lg font-semibold mb-2">{survey.title}</h3>
            <p className="text-gray-600">Vote Count: {survey.totalVote}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedSurveys;
