import React, { useEffect, useState } from 'react'
import Headers from './Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  Footer  from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";



const DoctorsView = () => {
    const [doctorView,setDoctorView] = useState([]);
    const navigate = useNavigate();
    const token = JSON.parse(useSelector((state) => state.user.token)) || null;

    
    const handleNavigate = (doctor)=>{
          navigate('/DoctorSingleView',{state:{data:doctor}})
    }



    const fetchDoctorsView = async()=>{
        try{
            const response = await axios.get(
                "http://127.0.0.1:8000/api/users/doctor-view/",{
                  headers: {
                    'Authorization': `Bearer ${token.access}`
                  }
                }
            );
            if(response.status === 200){
              
                setDoctorView(response.data)
                console.log(response.data);
            }

        }catch(error){
            console.log(error.response);
        }
    }

    useEffect(()=>{
        fetchDoctorsView();
    },[])


  
  return (
      <div className='bg-green-100' >
        <Headers/>
        

        <div className="flex flex-col justify-center items-center h-[100vh] ">
        <h5 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Docotrs</h5>
     
  <div className="relative flex max-w-[700px] h-[553px] w-full flex-col rounded-[10px] border-[2px] border-gray-200 bg-red-200 bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
    
    <div className="w-full overflow-x-scroll px-4 md:overflow-x-hidden">
      <table role="table" className="w-full min-w-[500px] overflow-x-scroll">
        <thead>
          <tr role="row">
          
          </tr>
        </thead>
        <tbody role="rowgroup">
    {doctorView.map((doctor) => (
      <tr role="row" key={doctor.id}>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-12 w-12">
              <img
                className="h-12 w-12 rounded-full bg-gray-300"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-4">
              <div className="text-xl font-semibold text-gray-900">{doctor.first_name}</div>
              <p className="mt-1 text-sm text-gray-500 truncate">{doctor.qualification}</p>
              <p
            className="text-sm text-blue-500 hover:text-blue-800 cursor-pointer"
            onClick={() => handleNavigate(doctor)}
          >
            View Details
          </p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="text-xl text-gray-900">{doctor.department}</div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <div className={`text-lg text-gray-900 ${doctor.available ? 'text-green-400' : 'text-red-500'}`}>
            {doctor.available ? 'Available' : 'Not available'}
          </div>
        </td>
        
      </tr>
    ))}
  </tbody>
      </table>
    </div>
  </div>
  
</div>

<Footer/>
     </div>
  )
}
export default DoctorsView;
