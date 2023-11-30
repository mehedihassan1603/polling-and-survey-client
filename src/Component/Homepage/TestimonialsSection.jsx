import React from 'react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      avatar: 'https://www.performanceautoandair.com/assets/media/avatar_reviews/1.jpg',
      testimonial: 'Taking the Employee Engagement Survey was a game-changer for our team! The insights gathered helped us understand our strengths and areas for improvement. The actionable strategies suggested by the survey resulted in a more cohesive and motivated workplace.',
    },
    {
      id: 2,
      avatar: 'https://www.shareicon.net/data/512x512/2016/09/01/822711_user_512x512.png',
      testimonial: 'Our experience with the Work Surveys was exceptional. The detailed analysis provided a clear roadmap for optimizing our work processes. We identified bottlenecks, improved collaboration, and witnessed a positive impact on overall performance.',
    },
    {
      id: 3,
      avatar: 'https://cdn-icons-png.flaticon.com/512/3048/3048127.png',
      testimonial: 'The Entertainment Surveys added a unique touch to our workplace culture. Understanding our teams recreational preferences through these surveys allowed us to implement initiatives that enhanced our work-life balance.',
    },
  ];

  return (
    <div className="bg-gray-800 py-12 text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Testimonials</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-8 bg-gray-700 rounded shadow-md">
              <img
                src={testimonial.avatar}
                alt={`Avatar ${testimonial.id}`}
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <div className="rating">
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" checked />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
  <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
</div>
              <p className="text-gray-300">{testimonial.testimonial}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;
