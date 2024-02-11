import React, { useEffect, useState } from 'react'
import AdminSideBar from './AdminSideBar'
import { FaUserDoctor,FaUser } from "react-icons/fa6";
import { BiNote } from "react-icons/bi";
import AxiosInstance from './AxiosInstance';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { login } from '../features/adminSlice';


const AdminProfile = () => {

   const[userCount,setUserCount] = useState(0);
   const[doctorCount,setDoctorCount] = useState(0);
   const[appointmentCount,setAppointmentCount] = useState(0);
   // const adminToken = useSelector((state)=>state.admin.token)
   const adminToken =JSON.parse( localStorage.getItem('adminToken')) || null


   // const Axios = AxiosInstance()
   const fetchData = async ()=>{
      console.log(adminToken.access);
      try
         {
         const Response = await axios.get('http://127.0.0.1:8000/api/adminpanel/adminprofile/',{
            headers:{
               'Authorization': `Bearer ${adminToken.access}`
            }
         });
        
         
         if(Response.status ===200){
            console.log(Response.data);
            setUserCount(Response.data);
            setDoctorCount(Response.data);
            setAppointmentCount(Response.data);
         }
         
      }catch(error){
            console.error('Error fecthing data:',error)
       }

   };


   useEffect(()=>{
      
      fetchData();

   },[])
  return (
    <div>
      <AdminSideBar/>   

<div class="p-4 sm:ml-64 " style= {{height: '500px'}} >
   <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14" >
      <div class="grid grid-cols-3 gap-4 mb-4">

         <div class="flex items-center justify-center h-24 rounded bg-gray-200 dark:bg-gray-800">
            <p class=" flex text-2xl text-red-950">
              <FaUserDoctor/>
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Doctors : {doctorCount[0]?.doctor} </h5>
            </p>
         </div>

         <div class="flex items-center justify-center h-24 rounded bg-gray-200 dark:bg-gray-800">
            <p class=" flex text-2xl text-red-950">
              <FaUser/>
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Users: {userCount[0]?.users}</h5>
            </p>
         </div>

         <div class="flex items-center justify-center h-24 rounded bg-gray-200 dark:bg-gray-800">
            <p class=" flex text-2xl text-red-950">
              <BiNote/>
              <h5 class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">Appointments: {appointmentCount[0]?.apponitment}</h5>
            </p>
         </div>
      </div>

      <div class="flex items-center justify-center h-48 mb-4 rounded bg-gray-200 dark:bg-gray-800">
         <p class="text-2xl text-gray-400 dark:text-gray-500">
            <svg class="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
            </svg>
         </p>
      </div>
 
   </div>
</div>


    </div>
  )
}
export default AdminProfile
