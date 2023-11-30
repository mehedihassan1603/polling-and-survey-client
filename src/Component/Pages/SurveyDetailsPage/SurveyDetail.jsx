import React, { useState, useEffect } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAuth from "../../AuthProvider/useAuth";
import Swal from "sweetalert2";

const SurveyDetailsPage = () => {
  const details = useLoaderData();
  const { _id } = useParams();
  const { user } = useAuth();
  const surveyData = details.find((item) => item._id === _id);
  const [survey, setSurvey] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [submitComment, setSubmitComment] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [likeDisabled, setLikeDisabled] = useState(false);
  const [dislikeDisabled, setDislikeDisabled] = useState(false);
  const [reportDisabled, setReportDisabled] = useState(false);

  

  const handleOptionChange = (questionIndex, optionIndex) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [questionIndex]: optionIndex,
    }));
  };

  const handleLike = async () => {
    if (!likeDisabled) {
      const updatedSurveyData = {
        like: surveyData.like + 1,
      };
      try {
        const response = await fetch(`https://polling-survey-server-two.vercel.app/survey/${_id}`, {
          method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedSurveyData }),
      });

        if (response.ok) {
          console.log('Like added successfully!');
          setLikeDisabled(true);
        } else {
          console.error('Error adding like:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };
  const handleDislike = async () => {
    if (!dislikeDisabled) {
      const updatedSurveyData = {
        dislike: surveyData.dislike + 1,
      };
      try {
        const response = await fetch(`https://polling-survey-server-two.vercel.app/survey/${_id}`, {
          method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedSurveyData }),
      });

        if (response.ok) {
          console.log('Like added successfully!');
          setDislikeDisabled(true);
        } else {
          console.error('Error adding like:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://polling-survey-server-two.vercel.app/survey/${_id}`);
        if (response.ok) {
          const data = await response.json();
          setSurvey(data);
        } else {
          console.error('Error fetching survey data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching survey data:', error.message);
      }
    };

    fetchData();
  }, [_id]);

  const handleSubmit = async () => {
    const updatedSurveyData = {
      totalVote: surveyData.totalVote + 1,
    };
  
    try {
      const response = await fetch(`https://polling-survey-server-two.vercel.app/survey/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updatedSurveyData }),
      });
  
      if (response.ok) {
        console.log("Survey data updated successfully!");
        setSubmitted(true);
      } else {
        const errorMessage = await response.text();
        console.error(`Error updating survey data: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  
  const handleReport = async () => {
    if (!reportDisabled) {
      Swal.fire({
        title: "Are you sure?",
        text: "You want to report this survey?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Reported",
            text: "You report this survey Successfully.",
            icon: "success"
          });
        }
      });
    }
    setReportDisabled(true);
  };


  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (!user) {
      return;
    }

    const updatedSurveyData = {
      comment: comment,
    };

    fetch(`https://polling-survey-server-two.vercel.app/survey/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ updatedSurveyData }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return setSubmitComment(true);
      })
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  if (
    !surveyData ||
    !surveyData.questions ||
    !Array.isArray(surveyData.questions)
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">{surveyData.title}</h1>
      <p className="text-gray-600">{surveyData.description}</p>
      <p className="text-gray-600">Category: {surveyData.category}</p>

      <form>
        {surveyData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="my-4">
            <p className="font-medium">{question.question}</p>
            <div className="flex items-center space-x-2">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    id={`option-${questionIndex}-${optionIndex}`}
                    name={`question-${questionIndex}`}
                    value={option}
                    onChange={() =>
                      handleOptionChange(questionIndex, optionIndex)
                    }
                    checked={selectedOptions[questionIndex] === optionIndex}
                    disabled={submitted}
                  />
                  <label
                    htmlFor={`option-${questionIndex}-${optionIndex}`}
                    className="ml-2 text-gray-600"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        {!submitted && (
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Submit Vote
          </button>
        )}
        {submitted && <p>Your vote has been submitted. Thank you!</p>}

        <div className="my-4">
          <label className="font-medium">Comment (Pro-User Only):</label>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="mt-1 p-2 w-full border rounded-md"
            disabled={!user || submitComment}
          />
        </div>
        {!submitComment && (
          <button
            type="button"
            onClick={handleSubmitComment}
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Submit Comment
          </button>
        )}
        {submitComment && <p>Your comment has been submitted. Thank you!</p>}

        <div className="my-8">
        <h2 className="text-xl font-semibold mb-4">Survey Results</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={[
              { option: 'Total Vote', count: survey?.totalVote || 0 },
              { option: 'Likes', count: survey?.like || 0 },
              { option: 'Dislikes', count: survey?.dislike || 0 },
            ]}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="option" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <button
        type="button"
        onClick={handleLike}
        className={`bg-blue-500 text-white p-2 rounded-md ${likeDisabled && 'opacity-50'}`}
        disabled={likeDisabled}
      >
        Like
      </button>
      <button
        type="button"
        onClick={handleDislike}
        className={`bg-red-500 text-white p-2 rounded-md ${dislikeDisabled && 'opacity-50'}`}
        disabled={dislikeDisabled}
      >
        Dislike
      </button>
      </form>

      <div>
      {!reportDisabled && (
      <button
        type="button"
        onClick={handleReport}
        className={`bg-red-500 text-white p-2 rounded-md ${reportDisabled && 'opacity-50'}`}
        disabled={reportDisabled}
      >
        Report Survey
      </button>
      )}
      {reportDisabled && <p>Your report has been submitted.</p>}
      </div>
    </div>
  );
};

export default SurveyDetailsPage;
