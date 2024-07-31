import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../userSlice';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import '../styles/Navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.username);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Inventory Management</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/about-us" className="navbar-link">About Us</Link></li>
        <li><Link to="/profile" className="navbar-link">Profile</Link></li>
      </ul>
      <div className="nav-account">
        {userName ? (
          <>
            <div className="nav-profile">
              <AccountCircleIcon className="nav-account-icon" />
              <span className="nav-username">{userName}</span>
            </div>
            <button onClick={() => dispatch(logout())} className="nav-button logout-button">
              <ExitToAppIcon className="nav-button-icon" />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-button login-button">
              <LoginIcon className="nav-button-icon" />
              Login
            </Link>
            <Link to="/register" className="nav-button register-button">
              <PersonAddIcon className="nav-button-icon" />
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
