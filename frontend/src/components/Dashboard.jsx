import React, { useState, useEffect } from 'react'
import instance from '../api/axios'
import { useNavigate } from 'react-router-dom'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement);

function Dashboard() {

    const [analytics, setAnalytics] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const fetchAnalytics = async () => {
        try{
            const response = await instance.get('/analytics')
            setAnalytics(response.data)
        }
        catch (error){
            setError(error.message)
        }

        finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAnalytics()
    }, [])

    const handleCreateTransaction = () => {
        navigate('/create-transaction'); // Redirect to the Create Transaction page
    };

    if (loading){
        return <div>Loading...</div>
    }
    if (error){
        return <div>Error: {error}</div>
    }

    const pieData = {
        labels : ['Fraudulent Transactions', 'Legitimate Transactions'],
        datasets: [
            {
                data: [analytics.fraudulentTransactions, analytics.legitimateTransactions],
                backgroundColor: ['#FF6384', '#36A2EB'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB']
            }
        ]
    }

    const lineData = {
        labels: analytics.transactionsByDate.map(t => t._id),
        datasets: [
            {
                label: 'Total Amount by Date',
                data: analytics.transactionsByDate.map(t => t.totalAmount),
                fill: false,
                borderColor: '#4BC0C0'
            }
        ]

    }

  return (
    <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <p className='text-xs'>Shows all transactions in the database</p>
        <button
            onClick={handleCreateTransaction}
            className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 mb-6"
        >
            Create Transaction
        </button>
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Transaction Breakdown</h2>
            <Pie data={pieData} />
        </div>
        <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Transaction Trends</h2>
            <Line data={lineData} />
        </div>
    </div>
  )
}

export default Dashboard