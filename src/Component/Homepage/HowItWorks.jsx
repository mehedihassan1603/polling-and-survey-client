import React from 'react';

const HowItWorks = () => {
  return (
    <div className="bg-gray-300 py-12 px-6 mb-10">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works 🛠</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="p-8 bg-white rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Step 1</h3>
            <p className="text-gray-700">
            Unlock the full potential of your organization by leveraging our suite of surveys designed to enhance employee engagement, optimize work processes, and cultivate a healthy work-life balance. Our Employee Engagement Surveys provide deep insights into team satisfaction, allowing you to address specific pain points and strengthen overall morale. 
            </p>
          </div>

          <div className="p-8 bg-white rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Step 2</h3>
            <p className="text-gray-700">
            Dive into the intricacies of work dynamics with our Work Surveys, identifying opportunities for increased productivity and improved collaboration. To promote a holistic approach, our Entertainment Surveys explore employees' recreational preferences.
            </p>
          </div>

          <div className="p-8 bg-white rounded shadow-md">
            <h3 className="text-xl font-semibold mb-4">Step 3</h3>
            <p className="text-gray-700">
            Contributing to the creation of a work environment that fosters not only professional growth but also personal well-being. Elevate your workplace experience with data-driven strategies that resonate across all facets of your organization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
