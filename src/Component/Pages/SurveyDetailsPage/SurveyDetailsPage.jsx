import React, { useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const SurveyDetailsPage = () => {
  const details = useLoaderData();
  console.log(details)
  const { _id } = useParams();
  const survey = details.find((item) => item._id === _id);
  console.log(survey)

  const [surveyDetails, setSurveyDetails] = useState({
    title: '',
    description: '',
    options: survey ? survey.options?.map((option) => ({ option, count: 0 })) : [],
    totalVotes: 0,
    votes: {},
    likes: 0,
    dislikes: 0,
    comments: [],
    deadline: null,
    userCanVote: false,
    userCanComment: false,
  });

  const [userVote, setUserVote] = useState(null);
  const [userComment, setUserComment] = useState('');

  const currentUser = {
    isLoggedIn: true,
    role: 'pro',
    username: 'exampleUser', // Make sure to replace this with the actual username if available.
  };

  const handleVote = (option) => {
    if (currentUser.isLoggedIn && surveyDetails.userCanVote && !userVote) {
      setSurveyDetails((prevState) => ({
        ...prevState,
        totalVotes: prevState.totalVotes + 1,
        votes: { ...prevState.votes, [option]: (prevState.votes[option] || 0) + 1 },
        options: prevState.options.map((entry) =>
          entry.option === option ? { ...entry, count: entry.count + 1 } : entry
        ),
      }));
      setUserVote(option);
    }
  };

  const handleComment = () => {
    if (currentUser.isLoggedIn && currentUser.role === 'pro' && surveyDetails.userCanComment) {
      setUserComment('');

      setSurveyDetails((prevState) => ({
        ...prevState,
        comments: [
          ...prevState.comments,
          { user: currentUser.username, comment: userComment },
        ],
      }));
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">{surveyDetails.title}</h1>
      <p className="mb-4">{surveyDetails.description}</p>

      {surveyDetails.userCanVote && !userVote && (
        <div className="mb-4">
          <p>Choose an option:</p>
          <div className="flex space-x-4">
            {surveyDetails.options.map((option) => (
              <button
                key={option.option}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleVote(option.option)}
              >
                {option.option}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Survey Results</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={surveyDetails.options}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="option" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {currentUser.isLoggedIn && (
        <div className="mb-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() =>
              setSurveyDetails((prevState) => ({ ...prevState, likes: prevState.likes + 1 }))
            }
          >
            Like ({surveyDetails.likes})
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              setSurveyDetails((prevState) => ({
                ...prevState,
                dislikes: prevState.dislikes + 1,
              }))
            }
          >
            Dislike ({surveyDetails.dislikes})
          </button>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {surveyDetails.comments.map((comment, index) => (
          <div key={index} className="border p-3 mb-2">
            <p className="font-bold">{comment.user}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>

      {currentUser.isLoggedIn &&
        currentUser.role === 'pro' &&
        surveyDetails.userCanComment && (
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Add Comment</h2>
            <textarea
              className="border p-2 w-full"
              rows="4"
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            ></textarea>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={handleComment}
            >
              Add Comment
            </button>
          </div>
        )}

      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => alert('Report functionality not implemented.')}
      >
        Report Survey
      </button>
    </div>
  );
};

export default SurveyDetailsPage;
