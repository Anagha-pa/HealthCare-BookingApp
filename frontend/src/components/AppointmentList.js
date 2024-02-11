import React, { useState,useEffect } from 'react'
import AdminSideBar from './AdminSideBar'
import axios from 'axios';
import toast from 'react-hot-toast'

const AppointmentList = () => {

  const[appointment,setAppointment] = useState("");
  const adminToken =JSON.parse( localStorage.getItem('adminToken')) || null;

  const handleDelete = async(id)=>{
    try{
      const response = await axios.delete(
        `http://127.0.0.1:8000/api/adminpanel/apponitment-delete/${id}/`,{
          headers:{
            'Authorization': `Bearer ${adminToken.access}`
         },
        }
      );
      if(response.status ===200){
          toast.success("deleted")
          // newappointe = appointment.filter((item)=>item.id!=id)
          // setAppointment
          fetchAppointment();
      }
    }catch(error){
            console.log(error.response);
    }
  };

  const fetchAppointment = async()=>{
    try{
      const response = await axios.get(
        "http://127.0.0.1:8000/api/adminpanel/apponitmentlist/",{
          headers:{
            'Authorization': `Bearer ${adminToken.access}`
         }
        }
      );
      if(response.status ===200){
        console.log(response.data);
        
        setAppointment(response.data);
      }
    }catch(error){
      console.log(error.response);
    }
  };

  useEffect(()=>{
    fetchAppointment();
  },[])

  return (
    <div>
        <AdminSideBar/>
        <div className="container mt-20" style={{display:"flex"}}>
      <div className="col-md-2"></div>
      <div className="col-md-10">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                NAME
              </th>
              <th scope="col" class="px-6 py-3">
                AGE
              </th>
              <th scope="col" class="px-6 py-3">
              GENDER
              </th>
              <th scope="col" class="px-6 py-3">
                PHONE NO
              </th>
              <th scope="col" class="px-6 py-3">
                DEPARTMENT
              </th>
              <th scope="col" class="px-6 py-3">
                DOCTOR
              </th>
              <th scope="col" class="px-6 py-3">
                Fee
              </th>
              <th scope="col" class="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
          {appointment &&
              appointment.map((item) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    
                    <td class="px-6 py-4">{item.first_name}</td>
                    <td class="px-6 py-4">{item.age}</td>
                    <td class="px-6 py-4">{item.gender}</td>
                    <td class="px-6 py-4">{item.phone_number}</td>
                    <td class="px-6 py-4">{item.department}</td>
                    <td class="px-6 py-4">{item.doctor}</td>
                    <td class="px-6 py-4">{item.fee}</td>
                    <td class="px-6 py-4">
                    <button 
                     type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
                     focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2" onClick={()=>{handleDelete(item.id)}}>delete</button>
                     
                    </td>
                  </tr>
                 );
                })}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    </div>
  )
}
export default AppointmentList

