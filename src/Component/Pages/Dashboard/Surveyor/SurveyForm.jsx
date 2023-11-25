import React, { useState } from 'react';

const SurveyForm = () => {
  const [surveyData, setSurveyData] = useState({
    title: '',
    description: '',
    options: ['Yes', 'No'], // Initial options
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSurveyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOptionsChange = (index, value) => {
    setSurveyData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions[index] = value;
      return { ...prevData, options: newOptions };
    });
  };

  const handleAddOption = () => {
    setSurveyData((prevData) => ({
      ...prevData,
      options: [...prevData.options, ''],
    }));
  };

  const handleRemoveOption = (index) => {
    setSurveyData((prevData) => {
      const newOptions = [...prevData.options];
      newOptions.splice(index, 1);
      return { ...prevData, options: newOptions };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to send surveyData to the backend for storage
    // Include timestamp and handle category selection
    const timestamp = new Date().toISOString();
    const surveyPayload = { ...surveyData, timestamp };
    console.log('Survey Payload:', surveyPayload);
    // Perform API request or other logic for survey creation
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Survey Creation</h1>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={surveyData.title}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={surveyData.description}
            onChange={handleChange}
            rows="3"
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Options</label>
          {surveyData.options.map((option, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionsChange(index, e.target.value)}
                className="p-2 border rounded-md mr-2"
                required
              />
              {surveyData.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddOption}
            className="mt-2 p-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Add Option
          </button>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={surveyData.category}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
          >
            Create Survey
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm;
