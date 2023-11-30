import React from 'react';

const FAQSection = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8">FAQ ❓📚</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">1. How can the Employee Engagement Survey benefit our team?</h3>
            <p className="text-gray-700">
              Our Employee Engagement Survey is designed to provide valuable insights into your team's satisfaction, helping you identify strengths and areas for improvement. The actionable data gathered can be used to enhance workplace morale and boost overall productivity.
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">2. How do Work Surveys contribute to performance enhancement?</h3>
            <p className="text-gray-700">
              Work Surveys offer a detailed analysis of your team's dynamics, collaboration, and workflow efficiency. By identifying bottlenecks and areas for improvement, organizations can optimize processes, leading to increased productivity and innovation.
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">3. How do Entertainment Surveys contribute to work-life balance?</h3>
            <p className="text-gray-700">
              Entertainment Surveys explore employees' recreational preferences, contributing to a holistic approach to work-life balance. By understanding your team's needs, you can implement initiatives that create a positive and enjoyable workplace culture.
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">4. Are these surveys suitable for all types of organizations?</h3>
            <p className="text-gray-700">
              Absolutely! Our surveys are designed to be versatile and can be tailored to suit the unique needs of various organizations, regardless of size or industry. Whether you're a startup, a non-profit, or a large corporation, our surveys can provide valuable insights to enhance your workplace.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
