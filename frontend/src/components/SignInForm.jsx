import React, { useState } from 'react'
import instance from '../api/axios'
import { useNavigate } from 'react-router-dom'

function SignInForm() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await instance.post('/auth/signin', { email, password })
            const { userId } = response.data.userId
            setError(null)
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
            setError(error.response?.data?.error)
        }
    }

  return (
    <form onSubmit={handleSubmit} className='bg-white p-4 shadow rounded'>
        <h2 className="text-xl font-bold mb-4">Sign In</h2>
        <div className='mb-4'>
            <label>Email</label>
            <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full border p-2" />
        </div>
        <div>
            <label>Password</label>
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full border p-2"/>
        </div>
        <button type='submit' className="bg-blue-500 text-white p-2 rounded">Sign In</button>
        {error && <p className='text-red-500'>{error}</p>}
    </form>
  )
}

export default SignInForm