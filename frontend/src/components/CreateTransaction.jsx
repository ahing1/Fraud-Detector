import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../api/axios'

function CreateTransaction() {

    const userId = localStorage.getItem('userId');
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const response = await instance.post('/transactions', {
                userId,
                amount,
            })
            setSuccess("Transaction created successfully")
            navigate('/dashboard')
        } catch (error) {
            setError(error.message)
            setSuccess(null)
        }
    }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
        <h1 className='text-2xl font-bold mb-4'>Create Transaction</h1>
        {error && <div className='text-red-500'>{error}</div>}
        {success && <div className='text-green-500'>{success}</div>}
        <form onSubmit={handleSubmit} className='bg-white p-4 shadow rounded'>
            <div>
                <label>Amount</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required className='w-full border p-2' />
            </div>
            <button type='submit' className='bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600'>
                Create Transaction
            </button>
        </form>
    </div>
  )
}

export default CreateTransaction