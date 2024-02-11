import React, { useEffect, useState } from 'react'
import axios from "axios";
import AdminSideBar from './AdminSideBar';

export const ListDepartments = () => {

  const [depData,setDepData] = useState([]);
  const adminToken = JSON.parse(localStorage.getItem("adminToken")) || null

  useEffect(()=>{
    fetchDepartment();
  },[]);

  const fetchDepartment = async ()=>{
    try{
      const response = await axios.get("http://127.0.0.1:8000/api/adminpanel/departments/",{
        headers:{
          'Authorization': `Bearer ${adminToken.access}`
        }
      }
      );
      if(response.status === 200){
        setDepData(response.data)
        console.log(response.data);
      }
    }catch(error){
      console.log(error.response);
    }

  };





  return (
    <div>
      <AdminSideBar />
    <div className="w-1/2 mx-auto mt-20"> {/* 3/4 width and centered */}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Department
              </th>
              <th scope="col" className="px-6 py-3">
                Fee
              </th>
            </tr>
          </thead>
          <tbody>
            {depData.map((depData)=>(<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">
                {depData.name}
              </td>
              <td className="px-6 py-4">
                {depData.fee}
              </td>
            </tr>))}
            
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}
