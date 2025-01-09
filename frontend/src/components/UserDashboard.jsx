import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../api/axios.js'

function UserDashboard() {

    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            const response = await instance.get(`/users/${userId}`);
            setUser(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchUser();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error: {error.message}</div>
    }
    if (!user) {
        return <div>User not found</div>
    }

  return (
    <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">{user.name}'s Dashboard</h1>
        <p>Email: {user.email}</p>
        <p>Account Age: {user.accountAge} days</p>
        <p>Verified: {user.isVerified ? 'Yes' : 'No'}</p>
        <p>Total Transaction Amount: ${user.totalTransactionAmount.toFixed(2)}</p>

        <h2 className="text-xl font-semibold mt-6">Transactions</h2>
        <table className="table-auto border-collapse border border-gray-300 w-full mt-4">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Fraud Status</th>
                </tr>
            </thead>
            <tbody>
            {user.transactions.length > 0 ? (
        user.transactions.map((transaction) => (
            <tr key={transaction._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{transaction._id}</td>
                <td className="border border-gray-300 px-4 py-2">${transaction.amount.toFixed(2)}</td>
                <td className="border border-gray-300 px-4 py-2">{new Date(transaction.timestamp).toLocaleString()}</td>
                <td
                    className={`border border-gray-300 px-4 py-2 ${
                        transaction.isFraud ? 'text-red-500' : 'text-green-500'
                    }`}
                >
                    {transaction.isFraud ? 'Fraudulent' : 'Legitimate'}
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="4" className="text-center border border-gray-300 px-4 py-2">
                No transactions available.
            </td>
        </tr>
    )}
            </tbody>
        </table>
    </div>
  )
}

export default UserDashboard