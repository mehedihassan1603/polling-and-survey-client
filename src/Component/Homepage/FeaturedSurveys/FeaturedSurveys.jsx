import React, { useState, useEffect } from 'react';
import '../Home/Home.css'
import { Link } from 'react-router-dom';

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
    <div className="container mx-auto bg-cyan-700 my-8">
      <h2 className="text-3xl font-bold mb-4 text-white bg-slate-700 py-3">Featured Surveys - Most Voted (Top 6)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featuredSurveys.slice(0, 6).map((survey) => (
          <div key={survey._id} className="p-4 border border-gray-300 mb-6 rounded bg-white w-5/6 mx-auto card-hover">
            <h3 className="text-lg font-semibold mb-2">{survey.title}</h3>
            <h3 className="text-lg mb-2">{survey.description}</h3>
            <p className="text-gray-600">Total Vote: <span className='font-semibold'> {survey.totalVote}</span></p>
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

export default FeaturedSurveys;
