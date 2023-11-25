import React, { useState } from 'react';

const SurveyCreationPage = () => {
  const [surveyData, setSurveyData] = useState({
    title: '',
    description: '',
    category: 'Entertainment',
    questions: [
      { text: 'Do you often use streaming services for entertainment?', answer: '' },
      { text: 'Have you attended a live event in the past year?', answer: '' },
      { text: 'Do you prefer watching movies at home or in a theater?', answer: '' },
      { text: 'Do you feel that your current workload is manageable?', answer: '' },
      { text: 'Have you received sufficient training for your role in the past year?', answer: '' },
      { text: 'Do you have regular one-on-one meetings with your supervisor?', answer: '' },
      { text: 'Do you feel valued and appreciated in your current role?', answer: '' },
      { text: 'Have you participated in any employee engagement in the past quarter?', answer: '' },
      { text: 'Do you believe your opinions are taken into consideration?', answer: '' },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSurveyData({
      ...surveyData,
      [name]: value,
    });
  };

  const handleAnswerChange = (index, value) => {
    const updatedQuestions = [...surveyData.questions];
    updatedQuestions[index].answer = value;
    setSurveyData({
      ...surveyData,
      questions: updatedQuestions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle survey submission logic here
    console.log('Survey Data:', surveyData);
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
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="Entertainment">Entertainment</option>
            <option value="Work">Work</option>
            <option value="Employee Engagement">Employee Engagement</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Questions:</label>
          <ul>
            {surveyData.questions.map((question, index) => (
              <li key={index} className="mb-2 flex justify-between items-center">
                <p className="mr-2 text-lg">{index + 1}. {question.text}</p>
                <div className="flex justify-center items-center mt-2">
                  <label className="mr-2">
                    <input
                      type="radio"
                      value="Yes"
                      checked={question.answer === 'Yes'}
                      onChange={() => handleAnswerChange(index, 'Yes')}
                      className="mr-1 text-lg radio checked:bg-blue-500"
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      value="No"
                      checked={question.answer === 'No'}
                      onChange={() => handleAnswerChange(index, 'No')}
                      className="mr-1 radio checked:bg-red-500"
                    />
                    No
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <button type="submit" className="bg-green-500 text-white p-2 rounded-md">
          Create Survey
        </button>
      </form>
    </div>
  );
};

export default SurveyCreationPage;
