import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar () {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/dashboard" className="navbar-link">Dashboard</Link>
            </div>
            <div className="navbar-right">
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/register" className="navbar-link">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;
