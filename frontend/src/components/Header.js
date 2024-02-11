import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assest/OIP-removebg-preview.png'


const 
Header = () => {
  return (
 
  <div className='sample1 '>
    
    <div>
      <img src={logo} width="100" height="" />
    </div>
    <div>
      <Link to="/" className="header__navLink">Home</Link>
      <Link to="/DoctorsView" className="header__navLink">Doctors</Link>
      {/* <Link to="/profile" className="header__navLink">Profile</Link> */}
      <Link to="/logout" className="header__navLink">Logout</Link>
    </div>
  </div>
  );
};

export default Header;
