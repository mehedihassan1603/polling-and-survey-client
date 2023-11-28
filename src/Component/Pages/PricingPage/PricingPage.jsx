import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router
// import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const PricingPage = () => {
//   const history = useHistory();

  // Example state to simulate user data and pro status
  const [user, setUser] = useState({
    id: 1,
    username: 'exampleUser',
    isPro: false,
  });

  // Example state for handling the payment process
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  // Function to simulate a successful payment and upgrade to pro status
  const handlePayment = () => {
    // Simulate a successful payment (in a real scenario, you'd integrate with a payment gateway)
    // Update the user's role to pro
    setUser((prevUser) => ({ ...prevUser, isPro: true }));

    // Set a flag to indicate a successful payment
    setIsPaymentSuccessful(true);

    // Redirect the user to a success page or any other page as needed
    // history.push('/payment-success');
  };

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-semibold mb-4">Pricing Page</h1>

      {/* Pricing options */}
      <div className="flex space-x-4 mb-4">
        <div className="p-6 border rounded">
          <h2 className="text-xl font-semibold mb-2">Basic</h2>
          <p>Free</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            onClick={handlePayment}
          >
            Become Basic
          </button>
        </div>

        <div className="p-6 border rounded">
          <h2 className="text-xl font-semibold mb-2">Pro</h2>
          <p>$20/month</p>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
          >
            <NavLink to="/payment">Become Pro</NavLink>
          </button>
        </div>
      </div>

      

      {/* Link to become a pro user */}
      {!user.isPro && (
        <div className="mb-4">
          <p>Want more features? Become a Pro User!</p>
          <Link to="/become-pro" className="text-blue-500 hover:underline">
            Become a Pro User
          </Link>
        </div>
      )}

      {/* Display a success message if payment is successful */}
      {isPaymentSuccessful && (
        <div className="bg-green-200 p-4 rounded">
          <p className="text-green-800 font-semibold">Payment successful! You are now a Pro User.</p>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
