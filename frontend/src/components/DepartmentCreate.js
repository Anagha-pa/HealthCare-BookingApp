import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminSideBar from './AdminSideBar';

const DepartmentCreate = () => {

    const [name,setName] = useState("");
    const [fee,setFee] = useState("");
    const navigate = useNavigate();
    const adminToken =JSON.parse( localStorage.getItem('adminToken')) || null

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post("http://127.0.0.1:8000/api/adminpanel/departments/",
            {
              name:name,
              fee:fee,   
            },
            {
                headers: {
                  'Authorization': `Bearer ${adminToken.access}`
                },
                   
              
              }
            );
            if (response.status === 201){
                console.log(response.data);
                console.log('succeesful');
                navigate('/ListDepartments')
                
            }

        }catch(error){
            console.log(error.response);
        }
    }


    
  return (
    <div>
      <AdminSideBar/>
      <div className="w-1/2 mx-auto mt-20"> 
        <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Department</label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Fee</label>
        <input
          type="fee"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Submit
      </button>
    </form>
    </div>
    </div>
  )
}
export default DepartmentCreate;
