import React, { useState } from 'react';
import { FaUserDoctor,FaUser } from "react-icons/fa6";
import { BiNote } from "react-icons/bi";
import './AdminProfile.css';
import { Link } from 'react-router-dom';
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout, selectUser } from "../features/adminSlice"; 

function DcotorProfile() {
 
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  
  
    const dispatch = useDispatch();
    const navigate = useNavigate()
   const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);

  };




  const handlelogout = ()=>{
    dispatch(logout());  //dispath the logout action
    navigate('/adminlogin')
  }

  return (
    <>
      <nav class="fixed top-0 z-50 w-full bg-black border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center justify-start">
                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white text-white">Doctor Dashboard</span>

            </div>
          </div>
        </div>
      </nav>

      <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-blue-900 border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">

        <div class="h-full px-3 pb-4 overflow-y-auto bg-blue-900 dark:bg-gray-800">
          <ul class="space-y-2 font-medium">
            
            <li>
              <a href="#" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <BiNote />
                <Link to={"/TodaysAppointments"} class="ml-3">Appointments</Link>
              </a>
            </li>
            {/* <li>
              <a href="#" class="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group" onClick={toggleDropdown}>
                <FaUserDoctor />
          
                <Link to={"/chat"} class="ml-3">Chat</Link>
          
              </a>
      
            </li>
             */}

           
            
          </ul>
          <button onClick={handlelogout} type="button" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 mr-2 ml-4 mt-3 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800">Log Out</button>
        </div>
      </aside>
    </>
  );
}

export default DcotorProfile;




 

