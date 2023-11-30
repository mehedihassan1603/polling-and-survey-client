import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SurveyCreationPage = () => {
  const [surveyData, setSurveyData] = useState({
    title: '',
    description: '',
    category: 'Entertainment',
    questions: [{ question: '', options: ['Yes', 'No'] }],
    totalVote: 0,
    like: 0,
    dislike: 0,
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    
    if (name === 'title' || name === 'description') {
      setSurveyData({
        ...surveyData,
        [name]: value,
      });
    } else {
      const updatedQuestions = [...surveyData.questions];
      updatedQuestions[index][name] = value;

      setSurveyData({
        ...surveyData,
        questions: updatedQuestions,
      });
    }
  };
  const handleCategoryChange = (e) => {
    setSurveyData({
      ...surveyData,
      category: e.target.value,
    });
  };


  const addQuestion = () => {
    setSurveyData({
      ...surveyData,
      questions: [...surveyData.questions, { question: '', options: ['Yes', 'No'] }],
    });
  };

  const removeQuestion = (index) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions.splice(index, 1);
    setSurveyData({
      ...surveyData,
      questions: updatedQuestions,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(surveyData),
      });

      if (response.ok) {
        toast.success('Survey Created Successfully!', {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        });
      } else {
        console.error('Error submitting survey:', response.statusText);
        // Handle error scenarios
      }
    } catch (error) {
      console.error('Error:', error.message);
      // Handle network errors or other issues
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Create a Survey</h1>
      <form onSubmit={handleSubmit} className="max-w-full">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Title:</label>
          <input
            type="text"
            name="title"
            value={surveyData.title}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Description:</label>
          <textarea
            name="description"
            value={surveyData.description}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Category:</label>
          <select
          name="category"
          value={surveyData.category}
          onChange={handleCategoryChange}
          className="mt-1 p-2 w-full border rounded-md"
        >
          <option value="Entertainment">Entertainment</option>
          <option value="Work">Work</option>
          <option value="Employee Engagement">Employee Engagement</option>
        </select>
        </div>

        {surveyData.questions.map((question, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium text-gray-600">
              Question {index + 1}:
            </label>
            <input
              type="text"
              name="question"
              value={question.question}
              onChange={(e) => handleInputChange(e, index)}
              className="mt-1 p-2 w-full border rounded-md"
            />
            <label className="block text-sm font-medium text-gray-600 mt-2">
              Options:
            </label>
            <div className="flex space-x-2">
              {question.options.map((option, optionIndex) => (
                <input
                  key={optionIndex}
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...question.options];
                    updatedOptions[optionIndex] = e.target.value;
                    const updatedQuestions = [...surveyData.questions];
                    updatedQuestions[index].options = updatedOptions;
                    setSurveyData({
                      ...surveyData,
                      questions: updatedQuestions,
                    });
                  }}
                  className="mt-1 p-2 flex-grow border rounded-md"
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => removeQuestion(index)}
              className="text-red-500 mt-2 underline cursor-pointer"
            >
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" onClick={addQuestion} className="bg-blue-500 text-white p-2 rounded-md">
          Add Question
        </button>
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
          Create Survey
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SurveyCreationPage;
