import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import GenerateShortURL from './components/GenerateShortURL';
import GetInsights from './components/GetInsights';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const navItems = [
    { label: 'Home', href: 'Home' },
    { label: 'Generate', href: 'Generate' },
    { label: 'Insights', href: 'Insights' }
  ];

  return (
    <Router>
      <Navbar brandName="SuS9" navItems={navItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/generate" element={<GenerateShortURL />} />
        <Route path="/insights" element={<GetInsights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
