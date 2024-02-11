import React from 'react';
import avatarImage from '../assest/img2.png'
import './SideBar.css'

const SideBar = () => {
    return (
      <div className="w-1/4 bg-light p-4 h-screen flex flex-col justify-center items-center">
      <div className="avatar">
        <img src={avatarImage} alt="Avatar" width={'100px'} />
      </div>
      <div className='name'>John Doe</div>
      <div className='address'>123 Main St, City</div>
      <ul className='nav flex-column mt-3'>
        <li className='nav-item'>
          <a className='nav-link' href='#'>
            Book Appointment
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#'>
            View & Pay Bills
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#'>
            Appointment History
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#'>
            Laboratory Result
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#'>
            Add Members
          </a>
        </li>
      </ul>
    </div>
      );
}
export default SideBar;
