import React, { useState } from 'react';

const SurveyCreationPage = () => {
  const [surveyData, setSurveyData] = useState({
    title: '',
    description: '',
    options: ['Yes', 'No'],
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurveyData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleOptionChange = (index, e) => {
    const newOptions = [...surveyData.options];
    newOptions[index] = e.target.value;
    setSurveyData((prevData) => ({ ...prevData, options: newOptions }));
  };

  const handleAddOption = () => {
    setSurveyData((prevData) => ({ ...prevData, options: [...prevData.options, ''] }));
  };

  const handleRemoveOption = (index) => {
    const newOptions = [...surveyData.options];
    newOptions.splice(index, 1);
    setSurveyData((prevData) => ({ ...prevData, options: newOptions }));
  };

  const handleCreateSurvey = () => {
    // Add logic to send surveyData to the backend
    // Include a timestamp from the backend
    // For simplicity, console.log is used here
    console.log('Survey Data:', surveyData);
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">Survey Creation</h1>

      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={surveyData.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={surveyData.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={surveyData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Options</label>
          {surveyData.options.map((option, index) => (
            <div key={index} className="flex mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e)}
                className="shadow appearance-none border rounded w-4/5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
              />
              <button
                type="button"
                onClick={() => handleRemoveOption(index)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Add Option
          </button>
        </div>

        <div className="mb-4">
          <button
            type="button"
            onClick={handleCreateSurvey}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyCreationPage;
