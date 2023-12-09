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
import axios from "axios";
import useAxiosSecure from "../../AuthProvider/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const SurveyDetailsPage = () => {
  const details = useLoaderData();
  const { _id } = useParams();
  const { user } = useAuth();
  const surveyData = details.find((item) => item._id === _id);
  const [survey, setSurvey] = useState(null);
  const [surveyAll, setSurveyAll] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState("");
  const [submitComment, setSubmitComment] = useState(false);
  const [chartData, setChartData] = useState([]);
  const [likeDisabled, setLikeDisabled] = useState(false);
  const [dislikeDisabled, setDislikeDisabled] = useState(false);
  const [reportDisabled, setReportDisabled] = useState(false);
  const [comments, setComments] = useState([]);
  const [userRole, setUserRole] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const visibleComments = showAll ? comments : comments.slice(0, 4);

  const storedUserActions =
    JSON.parse(localStorage.getItem(`userActions_${_id}`)) || {};

  // Check if the user has already submitted a vote, comment, like, or dislike
  const isVoteSubmitted = storedUserActions.totalVote;
  const isCommentSubmitted = storedUserActions.comment;
  const isLikeSubmitted = storedUserActions.like;
  const isDislikeSubmitted = storedUserActions.dislike;

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("https://polling-survey-server-two.vercel.app/comment");
        if (response.ok) {
          const commentsData = await response.json();
          console.log(commentsData);
          const surveyComments = commentsData.filter(
            (comment) => comment.surveyID === _id
          );
          setComments(surveyComments);
          // console.log(surveyComments)
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching comments:", error.message);
      }
    };

    fetchComments();
  }, []);

  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      console.log(res.data);
      return res.data;
    },
  });
  //   const userChoose = users.filter(user => user.role === 'Pro-User');
  // console.log(userChoose);
  // const findUser = userChoose.find(user => user.email);
  // if (findUser && findUser?.email === user?.email) {
  //   setUserRole(findUser)
  // } else {
  //   console.log('Email not matched');
  // }
  useEffect(() => {
    const userChoose = users.filter((user) => user.role === "Pro-User");
    console.log(userChoose);
    const findUser = userChoose.find((user) => user.email);

    if (findUser && findUser?.email === user?.email) {
      console.log("Email Matched");
      setUserRole(findUser);
    } else {
      console.log("Email not matched");
    }
  }, [users]);

  console.log(userRole);

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
          console.log("Like added successfully!");
          setLikeDisabled(true);
        } else {
          console.error("Error adding like:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
      localStorage.setItem(
        `userActions_${_id}`,
        JSON.stringify({ ...storedUserActions, like: true })
      );
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
          console.log("Dislike added successfully!");
          setDislikeDisabled(true);
        } else {
          console.error("Error adding dislike:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
      localStorage.setItem(
        `userActions_${_id}`,
        JSON.stringify({ ...storedUserActions, dislike: true })
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://polling-survey-server-two.vercel.app/survey/${_id}`);
        if (response.ok) {
          const data = await response.json();
          setSurvey(data);
          // Assuming comments is an array in your survey data
        } else {
          console.error("Error fetching survey data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching survey data:", error.message);
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
    localStorage.setItem(
      `userActions_${_id}`,
      JSON.stringify({ ...storedUserActions, totalVote: true })
    );
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
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Reported",
            text: "You report this survey Successfully.",
            icon: "success",
          });
        }
      });
    }
    setReportDisabled(true);
  };
  const { data: surveys = [] } = useQuery({
    queryKey: ["surveys"],
    queryFn: async () => {
      const res = await axiosSecure.get("/survey");
      console.log(res.data);
      return res.data;
    },
  });
  useEffect(() => {
    const filteredSurvey = surveys.find((survey) => survey._id === _id);
    console.log(filteredSurvey);

    if (filteredSurvey) {
      setSurveyAll(filteredSurvey);
      // Set the title in the state
    }
  }, [surveys, _id]);
  console.log(surveyAll)
  

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (!user) {
      return;
    }

    try {
      const response = await fetch(`https://polling-survey-server-two.vercel.app/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment,
          email: user.email,
          name: user.displayName,
          surveyID: _id,
          surveyName: surveyAll.title
          
          
        }),
      });

      if (response.ok) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Comment Submitted",
          showConfirmButton: false,
          timer: 1500,
        });
        setComment("");
      }
    } catch (error) {
      console.error("Error:", error.message);
      // Handle the error as needed (e.g., show a message to the user).
    }
  };

  if (
    !surveyData ||
    !surveyData.questions ||
    !Array.isArray(surveyData.questions)
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-300">
      <h1 className="text-3xl font-semibold bg-slate-700 text-white p-2 w-8/12 mx-auto mb-4">{surveyData.title}</h1>
      <p className="text-gray-600"><span className="text-lg font-semibold">Description:</span> {surveyData.description}</p>
      <p className="text-gray-600 mt-6"><span className="text-lg font-semibold">Category:</span> {surveyData.category}</p>

      <form className="mt-8">
        {surveyData.questions.map((question, questionIndex) => (
          <div key={questionIndex} className="my-4 bg-white w-8/12 mx-auto">
            <p className="font-medium">{question.question}</p>
            <div className="flex justify-center items-center space-x-2 mt-2 text-center ">
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center text-center">
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
                    className="form-radio text-blue-500 text-center"
                  />
                  <label
                    htmlFor={`option-${questionIndex}-${optionIndex}`}
                    className="ml-2 text-gray-600 cursor-pointer select-none"
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
            className={`bg-blue-500 text-white p-2 rounded-md ${
              isVoteSubmitted ? "opacity-50" : ""
            }`}
            disabled={isVoteSubmitted}
          >
            Submit Vote
          </button>
        )}
        {submitted && (
          <p className="text-green-500 mt-2">
            Your vote has been submitted. Thank you!
          </p>
        )}

        <div className=" w-8/12 mx-auto my-10">
          <label className="font-medium block text-2xl bg-slate-700 text-white p-2">
            Comment (Pro-User Only):
          </label>
          <textarea
            value={comment}
            onChange={handleCommentChange}
            className="border p-2 rounded-md w-full focus:outline-none focus:ring focus:border-blue-300"
            disabled={!user || submitComment}
          />

          {userRole ? (
            <button
              type="button"
              onClick={handleSubmitComment}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              disabled={!user || submitComment}
            >
              Submit Comment
            </button>
          ) : (
            <p className="mt-2 text-red-500">
              Become a Pro-User to add a comment
            </p>
          )}
        </div>

        <div className="my-8 w-8/12 mx-auto">
          <h2 className="text-2xl font-semibold bg-slate-700 text-white p-2">Comments</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 bg-white gap-4">
            {visibleComments.map((c, index) => (
              <div key={index} className="border p-2 m-2 bg-green-200">
                <p className="text-gray-800">{c.comment}</p>
                <p className="text-gray-600 mt-2">
                  By: {c.name} ({c.email})
                </p>
              </div>
            ))}
          </div>

          {!showAll && comments.length > 4 && (
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
              onClick={() => setShowAll(true)}
            >
              See More
            </button>
          )}
        </div>

        <div className="my-10 w-8/12 mx-auto">
          <h2 className="text-2xl font-semibold mb-4 bg-slate-700 text-white p-2">Survey Results</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={[
                { option: "Total Vote", count: survey?.totalVote || 0 },
                { option: "Likes", count: survey?.like || 0 },
                { option: "Dislikes", count: survey?.dislike || 0 },
              ]}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="option" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <button
          type="button"
          onClick={handleLike}
          className={`bg-blue-500 text-white p-2 rounded-md ${
            likeDisabled || isLikeSubmitted ? "opacity-50" : ""
          }`}
          disabled={likeDisabled || isLikeSubmitted}
        >
          Like
        </button>

        <button
          type="button"
          onClick={handleDislike}
          className={`bg-red-500 text-white p-2 rounded-md ${
            dislikeDisabled ? "opacity-50" : ""
          }`}
          disabled={dislikeDisabled || isDislikeSubmitted}
        >
          Dislike
        </button>
      </form>

      <div className="my-10 w-8/12 mx-auto">
        {!reportDisabled && (
          <button
            type="button"
            onClick={handleReport}
            className={`bg-red-500 text-white p-2 rounded-md ${
              reportDisabled ? "opacity-50" : ""
            }`}
            disabled={reportDisabled}
          >
            Report Survey
          </button>
        )}
        {reportDisabled && (
          <p className="text-green-500 mt-2">Your report has been submitted.</p>
        )}
      </div>
    </div>
  );
};

export default SurveyDetailsPage;
