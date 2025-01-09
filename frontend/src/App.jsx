import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import UserDashboard from './components/UserDashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users/:userId" element={<UserDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
