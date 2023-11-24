import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for navigation
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SurveyDetailsPage = () => {
  // Example state for survey details, comments, and user information
  const [surveyDetails, setSurveyDetails] = useState({
    title: "Sample Survey",
    description: "This is a sample survey description.",
    options: ["Yes", "No"],
    totalVotes: 0,
    votes: { "Yes": 0, "No": 0 },
    likes: 0,
    dislikes: 0,
    comments: [],
    deadline: new Date("2023-12-31"),
    userCanVote: false, // Assuming this will be based on user authentication
    userCanComment: false, // Assuming this will be based on user role (pro user)
  });

  // Example state for user's vote and comment
  const [userVote, setUserVote] = useState(null);
  const [userComment, setUserComment] = useState('');
  const [chartData, setChartData] = useState([]);

  // Example user information. Replace it with actual user authentication logic.
  const currentUser = {
    isLoggedIn: true,
    role: "pro", // "pro" or "regular"
  };

  // Fetch survey details based on the survey ID from the URL parameter
  const { surveyId } = useParams();

  useEffect(() => {
    // Fetch survey details from your backend based on the surveyId
    // Update the state with the fetched survey details
    // Example API call:
    // fetch(`/api/surveys/${surveyId}`)
    //   .then(response => response.json())
    //   .then(data => setSurveyDetails(data))
    //   .catch(error => console.error('Error fetching survey details:', error));

    // Example survey details for testing:
    const sampleSurveyDetails = {
      title: "Sample Survey",
      description: "This is a sample survey description.",
      options: ["Yes", "No"],
      totalVotes: 50,
      votes: { "Yes": 25, "No": 25 },
      likes: 10,
      dislikes: 5,
      comments: [
        { user: "ProUser1", comment: "This is a pro user comment." },
        { user: "ProUser2", comment: "Another pro user comment." },
      ],
      deadline: new Date("2023-12-31"),
    };

    setSurveyDetails(sampleSurveyDetails);
    setChartData(Object.entries(sampleSurveyDetails.votes).map(([option, count]) => ({ option, count })));
  }, [surveyId]);

  // Function to handle user vote
  const handleVote = (option) => {
    if (currentUser.isLoggedIn && surveyDetails.userCanVote && !userVote) {
      // Update the state with the user's vote
      setUserVote(option);

      // Update the survey details with the new vote
      setSurveyDetails(prevState => ({
        ...prevState,
        totalVotes: prevState.totalVotes + 1,
        votes: { ...prevState.votes, [option]: prevState.votes[option] + 1 },
      }));

      // Update the chart data
      setChartData(prevData => prevData.map(entry => (entry.option === option ? { ...entry, count: entry.count + 1 } : entry)));
    }
  };

  // Function to handle user comment
  const handleComment = () => {
    if (currentUser.isLoggedIn && currentUser.role === "pro" && surveyDetails.userCanComment) {
      // Update the state with the user's comment
      setUserComment('');

      // Update the survey details with the new comment
      setSurveyDetails(prevState => ({
        ...prevState,
        comments: [...prevState.comments, { user: currentUser.username, comment: userComment }],
      }));
    }
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">{surveyDetails.title}</h1>
      <p className="mb-4">{surveyDetails.description}</p>

      {/* Display survey options and allow user to vote */}
      {surveyDetails.userCanVote && !userVote && (
        <div className="mb-4">
          <p>Choose an option:</p>
          <div className="flex space-x-4">
            {surveyDetails.options.map(option => (
              <button
                key={option}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleVote(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Display survey results visually by charts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Survey Results</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="option" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Display like/dislike buttons */}
      {currentUser.isLoggedIn && (
        <div className="mb-4">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => setSurveyDetails(prevState => ({ ...prevState, likes: prevState.likes + 1 }))}
          >
            Like ({surveyDetails.likes})
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setSurveyDetails(prevState => ({ ...prevState, dislikes: prevState.dislikes + 1 }))}
          >
            Dislike ({surveyDetails.dislikes})
          </button>
        </div>
      )}

      {/* Display comments */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {surveyDetails.comments.map((comment, index) => (
          <div key={index} className="border p-3 mb-2">
            <p className="font-bold">{comment.user}</p>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>

      {/* Allow pro users to add comments */}
      {currentUser.isLoggedIn && currentUser.role === "pro" && surveyDetails.userCanComment && (
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

      {/* Display a button to report the survey */}
      <button
        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => alert("Report functionality not implemented.")}
      >
        Report Survey
      </button>
    </div>
  );
};

export default SurveyDetailsPage;
