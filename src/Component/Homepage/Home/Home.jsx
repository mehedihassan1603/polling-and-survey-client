import Banner from "../Banner/Banner";
import Chat from "../Chat/Chat";
import FAQSection from "../FAQSection";
import FeaturedSurveys from "../FeaturedSurveys/FeaturedSurveys";
import HowItWorks from "../HowItWorks";
import LatestSurveys from "../LatestSurveys/LatestSurveys";
import TestimonialsSection from "../TestimonialsSection";
import './Home.css'

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FeaturedSurveys></FeaturedSurveys>
      <LatestSurveys></LatestSurveys>
      <HowItWorks></HowItWorks>
      <TestimonialsSection></TestimonialsSection>
      <div className="bg-gray-300 mt-10 pb-10">
        <h1 className="text-center bg-slate-700 text-white rounded-md py-3 mb-4 text-2xl">
          Chat With Us
        </h1>
        <Chat></Chat>
      </div>
      <FAQSection></FAQSection>

      <div className="bg-blue-100 py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Us</h2>
          <p className="text-gray-700 mb-8">
            Welcome to <b>Survey-Hunter</b>, where we believe in the power of
            surveys to transform workplaces and enhance the overall experience
            of employees. Our mission is to provide organizations with valuable
            insights through innovative survey solutions, fostering a positive
            and thriving work environment.
          </p>
          <p className="text-gray-700 mb-8">
            At <b>Survey-Hunter</b>, we specialize in Employee Engagement
            Surveys, Work Surveys for Performance Enhancement, and Entertainment
            Surveys for achieving the perfect work-life balance. Our commitment
            is to deliver accurate, actionable data that empowers organizations
            to make informed decisions for growth and success.
          </p>
          <p className="text-gray-700">
            Join us on this journey to revolutionize the way workplaces
            understand and improve employee satisfaction, collaboration, and
            overall well-being. Let's create workplaces where everyone can
            thrive!
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-violet-900 via-blue-800 to-violet-900 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us 📬</h2>
          <p className="text-lg mb-4">
            We'd love to hear from you! <br /> Reach out to us with any
            questions, inquiries, or feedback. <br /> Your thoughts are
            important to us, and we're here to assist you.
          </p>
          <h1 className="mb-4 text-xl">Mobile: 01761859387</h1>
          <div className="flex justify-center">
            <a
              href="mailto:info@surveyhunter.com"
              className="bg-white text-purple-500 px-6 py-3 rounded-full font-bold hover:bg-purple-400 hover:text-white transition duration-300"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-6 mt-10">
        <div className="bg-gray-300 py-12 rounded-md">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Privacy Policy 🔒</h2>
            <p className="text-gray-700 mb-8">
              At [Your Company Name], we take your privacy seriously. This
              Privacy Policy outlines how we collect, use, and protect your
              personal information when you use our services. Please review this
              policy to understand how your data is handled.
            </p>
            <p className="text-gray-700 mb-8">
              We may update this Privacy Policy from time to time, so we
              recommend checking this page periodically. By continuing to use
              our services, you agree to the terms outlined in the most recent
              version of our Privacy Policy.
            </p>
          </div>
        </div>
        <div className="bg-gray-300 py-12 rounded-md">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Terms of Service ⚖️</h2>
            <p className="text-gray-700 mb-8">
              Welcome to [Your Company Name]! By using our website and services,
              you agree to comply with and be bound by the following terms and
              conditions. Please read these Terms of Service carefully before
              using our services.
            </p>
            <p className="text-gray-700 mb-8">
              If you do not agree to these terms, please refrain from using our
              services. We reserve the right to update, change, or replace any
              part of these Terms of Service, so we recommend reviewing them
              periodically. Your continued use of our services constitutes
              acceptance of any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
