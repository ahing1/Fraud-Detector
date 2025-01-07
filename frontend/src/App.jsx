import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile/:userId" element={<ProfilePage />} />
      </Routes>
    </Router>
  )
}

export default App
