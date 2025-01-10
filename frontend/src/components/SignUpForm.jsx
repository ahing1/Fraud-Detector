import { useState } from 'react'
import instance from '../api/axios'
import { useNavigate } from 'react-router-dom'

function SignUpForm() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await instance.post('/auth/signup', { name, email, password })
            const { userId } = response.data
            setError(null)
            localStorage.setItem('userId', userId);
            navigate('/dashboard')
        } catch (error) {
            console.error(error)
            setError(error.response?.data?.error)
        }
    }

    const handleNavigate = () => {
        navigate('/')
    }

  return (
    <>
        <form onSubmit={handleSubmit} className='bg-white p-4 shadow rounded'>
            <h2 className='text-xl font-bold mb-4'>Sign Up</h2>
            <div className='mb-4'>
                <label>Name</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} required className='w-full border p-2'/>
            </div>
            <div className='mb-4'>
                <label>Email</label>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required className='w-full border p-2'/>
            </div>
            <div className='mb-4'>
                <label>Password</label>
                <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required className='w-full border p-2'/>
            </div>
            <button type='submit' className='bg-green-500 text-white p-2 rounded'>Sign Up</button>
            {error && <p>{error}</p>}
        </form>
        <div>
            <p>Already have an account?</p>
            <button onClick={handleNavigate} className='text-blue-500'>Sign In</button>
        </div>
    </>
  )
}

export default SignUpForm