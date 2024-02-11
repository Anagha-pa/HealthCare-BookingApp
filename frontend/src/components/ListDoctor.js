import React, { useEffect, useState } from "react";
import AdminSideBar from "./AdminSideBar";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import { useActionData } from "react-router-dom";

const ListDoctor = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const adminToken =JSON.parse( localStorage.getItem('adminToken')) || null


  const handleSubmit =(item)=> {
    navigate('/edit-doctor',{state:{data:item}})

  }

  const handleChange = async(id)=>{ 
    console.log(adminToken.access);
    try{
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/adminpanel/doctor-available/${id}/`,
        {},
        {
          headers:{
            'Authorization': `Bearer ${adminToken.access}`
         }
        }
      );
      if(response.status === 200){
        // fetchDoctor()

        const updatedDoctors = doctors.map((doctor) => {
          if (doctor.id === id) {
            return {
              ...doctor,
              available: !doctor.available,
            };
          }
          return doctor;
        });
        setDoctors(updatedDoctors);

      }
    }catch(error){
      console.log(error);
    }

  };

  const fetchDoctor = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/adminpanel/doctors/",{
          headers:{
            'Authorization': `Bearer ${adminToken.access}`
         }
        }
      );
      if (response.status === 200) {
        setDoctors(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  

  useEffect(() => {
    fetchDoctor();
  
  }, []);
  
  useEffect(() => {
    console.log(doctors);
  
  }, []);
  return (
    <div>
      <AdminSideBar />
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
                GENDER
              </th>
              <th scope="col" class="px-6 py-3">
                DEPARTMENT
              </th>
              <th scope="col" class="px-6 py-3">
                QUALIFICATION
              </th>
              <th scope="col" class="px-6 py-3">
                EXPERIENCE
              </th>
              <th scope="col" class="px-6 py-3">
                PH.NO
              </th>
              <th scope="col" class="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {doctors &&
              doctors.map((item) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    
                    <td class="px-6 py-4">{item.first_name}</td>
                    <td class="px-6 py-4">{item.gender}</td>
                    <td class="px-6 py-4">{item.department}</td>
                    <td class="px-6 py-4">{item.qualification}</td>
                    <td class="px-6 py-4">{item.experience}</td>
                    <td class="px-6 py-4">{item.phone_number}</td>
                    <td class="px-6 py-4">{item.available?"available":"not available"}</td>
                    <td class="px-6 py-4">
                    <button onClick={()=>handleSubmit(item)}
                     type="button" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
                     focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2">Edit</button>
                    {item.available?(
                    <button type="button" class="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br
                     focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2" onClick={()=>handleChange(item.id)}>Available</button>)
                     :(<button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500
                     to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300
                      dark:focus:ring-red-800 font-medium rounded-lg text-sm px-1 py-2.5 text-center mr-2 mb-2" onClick={()=>handleChange(item.id)}>Not Available</button> )
                    }
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
  );
};
export default ListDoctor;

