import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {

    const userId = localStorage.getItem('userId');

  return (
    <nav className="bg-gray-800 text-white p-4">
        <div>
            <h1 className="text-xl font-bold">Fraud Detection</h1>
            <ul className='flex space-x-4'>
                <li>
                    <Link to="/dashboard" className="hover:text-gray-300">
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link to={`/users/${userId}`} className="hover:text-gray-300">
                        Profile
                    </Link>
                </li>
            </ul>
        </div>
    </nav>
    
  )
}

export default NavBar