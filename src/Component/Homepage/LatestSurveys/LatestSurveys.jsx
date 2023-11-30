import React, { useState, useEffect } from 'react';
import moment from 'moment';
import '../Home/Home.css'


const LatestSurveys = () => {
  const [latestSurveys, setLatestSurveys] = useState([]);

  useEffect(() => {
    const fetchLatestSurveys = async () => {
      try {
        const response = await fetch('http://localhost:5000/survey');
        const data = await response.json();
        // Sort surveys by timestamp in descending order
        const sortedSurveys = data.sort((a, b) => moment(b.timestamp) - moment(a.timestamp));
        setLatestSurveys(sortedSurveys);
      } catch (error) {
        console.error('Error fetching latest surveys:', error);
      }
    };

    fetchLatestSurveys();
  }, []);

  return (
    <div className="container mx-auto bg-sky-300 my-8">
      <h2 className="text-3xl font-bold mb-4 text-white bg-slate-700 py-3">Latest Surveys - Most Recent (Top 6)</h2>
      <div className="grid grid-cols-2 gap-4 ">
        {latestSurveys.slice(0, 6).map((survey) => (
          <div key={survey._id} className="p-4 border border-gray-300 mb-6 rounded bg-white w-5/6 mx-auto card-hover">
            <h3 className="text-lg font-semibold mb-2">{survey.title}</h3>
            <p className="text-gray-600">
              Created at: {moment(survey.timestamp).format('MMMM D, YYYY h:mm A')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestSurveys;
