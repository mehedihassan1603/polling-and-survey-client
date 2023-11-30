import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../AuthProvider/useAxiosSecure";
import { AiFillDelete } from "react-icons/ai";
import { FaList, FaUsers } from "react-icons/fa6";
import Swal from "sweetalert2";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ['users', 'payments'],
    queryFn: async () => {
      const [usersRes, paymentsRes] = await Promise.all([
        axiosSecure.get('/users'),
        axiosSecure.get('/payments'),  // Adjust the endpoint as needed
      ]);

      const usersData = usersRes.data;
      console.log(usersData)
      const paymentsData = paymentsRes.data;
      console.log(paymentsData)

      // Assuming there is a way to map payments to users, adjust this part accordingly
      const usersWithPayments = usersData.map(user => {
        const proUserRequest = paymentsData.find(payment => payment.email === user.email);
        console.log(proUserRequest)
        return {
          ...user,
          proUserRequest,
        };
      });

      console.log(usersWithPayments);

      return usersWithPayments;
    },
  });
  const handleAcceptProUserRequest = (user) => {
    // Assuming there's a way to identify the payment associated with the user
    const paymentId = user.proUserRequest._id;
    console.log(paymentId)
    
    const userId = user._id;

    axiosSecure.patch(`/payments/${paymentId}`, { status: 'Paid' })
    .then((res) => {
      if (res.data.modifiedCount > 0) {
        // Update user role to 'Pro-User'
        axiosSecure.patch(`/users/prouser/${userId}`)
          .then(() => {
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: `Pro-User Request Accepted Successfully!`,
              showConfirmButton: false,
              timer: 1500,
            });
          })
        }
      })
  };

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is an Admin Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };

  const handleMakeSurveyor = (user) => {
    axiosSecure.patch(`/users/surveyor/${user._id}`)
      .then(res => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is a Surveyor Now!`,
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`)
          .then(res => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
      }
    });
  };
  

  return (
    <div>
      <div className="flex justify-evenly my-4">
        <h2 className="text-3xl">All Users</h2>
        <h2 className="text-3xl">Total Users: {users.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                {user.role === 'admin' ? 'Admin' : user.role === 'surveyor' ? 'Surveyor' : (
                  <div>
                    {user.proUserRequest && user.proUserRequest.status === 'pending' ? (
                      <div className="flex flex-col justify-center items-center">
                        <h1>Pro-User Request</h1>
                        <div>
                          <button className="bg-green-500 mt-2 rounded-md px-4 py-1 text-white hover:bg-green-800" onClick={() => handleAcceptProUserRequest(user)}>
                            Accept
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <button
                          onClick={() => handleMakeAdmin(user)}
                          className="btn bg-orange-500"
                        >
                          <FaUsers className="text-white"></FaUsers>
                        </button>
                        <button
                          onClick={() => handleMakeSurveyor(user)}
                          className="btn bg-blue-500 ml-2"
                        >
                          <FaUsers className="text-white"></FaUsers>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-lg"
                  >
                    <AiFillDelete className="text-red-600"></AiFillDelete>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
