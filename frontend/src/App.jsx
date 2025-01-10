import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import UserDashboard from './components/UserDashboard.jsx';
import Home from './pages/Home.jsx';
import SignUpForm from './components/SignUpForm.jsx';
import NavBar from './components/NavBar.jsx';
import CreateTransaction from './components/CreateTransaction.jsx';

function App() {
  return (
    <>
    <Router>
     <header>
        <NavBar />
      </header>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users/:userId" element={<UserDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/create-transaction" element={<CreateTransaction/>} />
      </Routes>
    </Router>

    </>
  )
}

export default App
