import React from 'react'
import SignInForm from '../components/SignInForm.jsx'
import SignUpForm from '../components/SignUpForm.jsx'
import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate()

    const handleRedirect = () => {
        navigate('/signup')
    }

  return (
    <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome to Fraud Detection</h1>
        <div className="flex justify-around">
            <SignInForm />
        </div>
        <div className="text-center mt-4">
            <p>Don't have an account?</p>
            <button onClick={handleRedirect} className="text-blue-500">Sign Up</button>
        </div>
    </div>
  )
}

export default Home