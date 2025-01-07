import { useState } from 'react'
import './App.css'
import instance from './api/axios.js'

function App() {
  const [formData, setFormData] = useState({
    Time: '',
    V1: '',
    V2: '',
    V3: '',
    V4: '',
    V5: '',
    V6: '',
    V7: '',
    V8: '',
    V9: '',
    V10: '',
    V11: '',
    V12: '',
    V13: '',
    V14: '',
    V15: '',
    V16: '',
    V17: '',
    V18: '',
    V19: '',
    V20: '',
    V21: '',
    V22: '',
    V23: '',
    V24: '',
    V25: '',
    V26: '',
    V27: '',
    V28: '',
    Amount: ''
  })

  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null)
    setLoading(true)
    try{
      const response = await instance.post('/predictions', formData);
      setPrediction(response.data.prediction)
    }
    catch (error){
      setError(error.response?.data?.error)
    }
    finally{
      setLoading(false)
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-600">Fraud Detection</h1>
            {loading && ( <p className="text-center">Loading...</p>)}
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
            >
                {Object.keys(formData).map((key) => (
                    <div key={key} className="mb-4">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor={key}
                        >
                            {key}:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id={key}
                            type="number"
                            name={key}
                            value={formData[key]}
                            onChange={handleChange}
                            required
                        />
                    </div>
                ))}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Predict
                </button>
            </form>

            {prediction !== null && (
                <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    <h2 className="text-lg font-bold">Prediction Result</h2>
                    <p>
                        {prediction === 1
                            ? 'Fraudulent Transaction'
                            : 'Legitimate Transaction'}
                    </p>
                </div>
            )}

            {error && (
                <p className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </p>
            )}
        </div>
    </>
  )
}

export default App
