import React from 'react'
import avatarImage from '../assest/img2.png'


const DoctorSideBar = () => {
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
            Today's Appointment
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#'>
            Previous Appointment
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#'>
            Prescription
          </a>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#'>
            Laboratory Result
          </a>
        </li>
      </ul>
    </div>
  )
}
export default DoctorSideBar;