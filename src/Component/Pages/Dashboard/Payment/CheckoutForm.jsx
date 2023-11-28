import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../AuthProvider/useAxiosSecure";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../AuthProvider/useAuth";

const CheckoutForm = () => {
  const [error, setError] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const amount = 20;
  const navigate = useNavigate();

  useEffect(()=>{
    axiosSecure.post('/create-payment-intent', {price: amount})
    .then(res =>{
        console.log(res.data.clientSecret)
        setClientSecret(res.data.clientSecret);
    })
  }, [axiosSecure, amount])

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return
    }

    const card = elements.getElement(CardElement)

    if (card === null) {
      return
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    })

    if (error) {
      console.log('payment error', error);
      setError(error.message);
    }
    else {
      console.log('payment method', paymentMethod)
      setError('');
    }

    //confirm payment
    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })
    if (confirmError) {
        console.log('confirm error')
    }
    else {
        console.log('payment intent', paymentIntent)
        if (paymentIntent.status === 'succeeded') {
            console.log('transaction id', paymentIntent.id);
            setTransactionId(paymentIntent.id);

            // now save the payment in the database
            const payment = {
                email: user.email,
                price: amount,
                transactionId: paymentIntent.id,
                date: new Date(), // utc date convert. use moment js to 
                status: 'pending'
            }

            const res = await axiosSecure.post('/payments', payment);
            console.log('payment saved', res.data);
            
            if (res.data?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for payment",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/userDashboard/paymentHistory')
            }

        }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-blue-400 rounded shadow-lg">
      <div className="mb-4">
        <label className="block text-black text-sm font-bold mb-2" htmlFor="card-element">
          Card Details
        </label>
        <CardElement
          id="card-element"
          options={{
            style: {
              base: {
                fontSize: '18px',
                color: '#080808',
                '::placeholder': {
                  color: '#080808',
                },
              },
              invalid: {
                color: '#080808',
              },
            },
          }}
        />
      </div>
      <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded" type="submit">
        Pay
      </button>
      <p className="text-red-600 mt-2">{error}</p>
      {transactionId && <p className="text-green-600"> Your transaction id: {transactionId}</p>}
    </form>
  );
};

export default CheckoutForm;
