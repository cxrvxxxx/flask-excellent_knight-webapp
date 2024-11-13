import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LandingPage from './Pages/Landingpage';
import Login from './Pages/Login';
import Register from './Pages/Register'; // Import your Register component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login/>} />

            </Routes>
        </Router>
    );
}

export default App;
