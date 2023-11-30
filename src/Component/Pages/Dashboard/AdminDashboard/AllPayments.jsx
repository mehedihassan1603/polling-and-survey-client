import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../AuthProvider/useAuth";
import useAxiosSecure from "../../../AuthProvider/useAxiosSecure";

const AllPayments = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments`)
            return res.data;
        }
    })

    return (
        <div>
            <h2 className="text3-xl">Total Payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                  
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Email</th>
                            <th>Transaction Id</th>
                            <th>Price</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => <tr key={payment._id}>
                            <th>{index + 1}</th>
                            <td>${payment.email}</td>
                            <td>{payment.transactionId}</td>
                            <td>{payment.price}</td>
                            <td>{payment.date}</td>
                        </tr>)}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllPayments;