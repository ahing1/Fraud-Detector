import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import instance from '../api/axios.js'

function ProfilePage() {

    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchUserData = async () => {
        setLoading(true)
        try{
            const response = await instance.get(`/users/${userId}`)
            setUser(response.data)
            const transactionsResponse = await instance.get(`/users/${userId}/transactions`)
            setTransactions(transactionsResponse.data)
        }
        catch (error){
            setError(error.response?.data?.error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [userId]);

    if(loading) return <div>Loading...</div>
    if(error) return <div>Error: {error}</div>
    if(!user) return <div>No user data</div>

  return (
    <div className='p-6 max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>{user.name}</h1>
        <div className='mb-6'>
            <p>Email: {user.email}</p>
            <p>Account Age: {user.accountAge}</p>
            <p>Verified: {user.isVerified ? "Yes" : "No"}</p>
            <p>Total Transaction Amount: {user.totalTransactionAmount}</p>
        </div>
        
        <h2 className='text-xl font-semibold mb-4'>Transactions</h2>
        <table className='table-auto border-collapse border border-gray-300 w-full'>
            <thead>
                <tr className='bg-gray-100'>
                    <th className="border border-gray-300 px-4 py-2">Transaction ID</th>
                    <th className="border border-gray-300 px-4 py-2">Amount</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Fraud Status</th>
                </tr>
            </thead>
            <tbody>
                {transactions.map(transaction => (
                    <tr key={transaction._id} className='text-center'>
                        <td className="border border-gray-300 px-4 py-2">{transaction._id}</td>
                        <td className="border border-gray-300 px-4 py-2">{transaction.amount}</td>
                        <td className="border border-gray-300 px-4 py-2">{new Date(transaction.timestamp).toLocaleString()}</td>
                        <td className={`border border-gray-300 px-4 py-2 ${transaction.isFraud ? 'text-red-500' : 'text-green-500'}`}>{transaction.isFraud ? 'Fraudulent' : 'Legitimate'}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>
  )
}

export default ProfilePage