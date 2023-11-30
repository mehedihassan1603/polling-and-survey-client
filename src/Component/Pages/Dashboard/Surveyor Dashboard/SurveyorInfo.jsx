import moment from 'moment';
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../AuthProvider/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const SurveyorInfo = () => {
  const [surveyFeedback, setSurveyFeedback] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [surveyResponses, setSurveyResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSurveyFeedback, setShowSurveyFeedback] = useState(false);
  const [desiredSurveyID, setDesiredSurveyID] = useState(null);
  


  const axiosSecure = useAxiosSecure();

  const { data: survey = [] } = useQuery({
    queryKey: ['survey'],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get('/survey');
        console.log(res.data);
        return res.data;
      } catch (error) {
        console.error('Error fetching survey data:', error);
        throw error;
      }
    },
  });

  const { data: comment = [] } = useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get('/comment');
        console.log(res.data);
        return res.data;
      } catch (error) {
        console.error('Error fetching comment data:', error);
        throw error;
      }
    },
  });

  useEffect(() => {
    
    setSurveyResponses(survey);
  }, [survey]);


useEffect(() => {
  // Assuming comment structure has a property named surveyID
  const filteredComments = desiredSurveyID
    ? comment.filter((commentItem) => commentItem.surveyID === desiredSurveyID)
    : comment;

  console.log(filteredComments);
  setSurveyFeedback(filteredComments);
  setLoading(false); // Set loading to false when both queries are complete
}, [comment, desiredSurveyID]);


  const toggleSurveyFeedback = () => {
    setShowSurveyFeedback(!showSurveyFeedback);
  };

  const renderSurveyFeedback = () => {
    return (
      <ul>
        {surveyFeedback.map((feedback, index) => (
          <li key={index}>
            <span className='font-semibold'>Title: </span>{feedback.surveyName}<span className='font-semibold ml-4'>Feedback: </span>{feedback.comment}
            </li>
        ))}
      </ul>
    );
  };

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
              </td>
              <td className="border-b">{response.totalVote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Surveyor Dashboard</h1>

      {/* Survey Feedback */}
      <div className="mb-8">
  <h2 className="text-xl font-bold mb-4">Survey Feedback</h2>
  <button
    onClick={toggleSurveyFeedback}
    className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
  >
    {showSurveyFeedback ? 'Hide Survey Feedback' : 'View Survey Feedback'}
  </button>
  <div className='bg-gray-200 rounded-md'>
  {showSurveyFeedback && renderSurveyFeedback()}
  </div>
</div>


      {/* Admin Feedback */}
      {feedbackMessage && (
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">Admin Feedback</h2>
          {/* Logic to display admin feedback */}
          <button
            onClick={() => handleAdminFeedback(/* surveyId */)}
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            View Admin Feedback
          </button>
        </div>
      )}

      {/* Survey Responses Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Survey Responses</h2>
        {renderSurveyResponsesTable()}
      </div>

      
    </div>
  );
};

export default SurveyorInfo;
