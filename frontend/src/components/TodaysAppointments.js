import React from 'react';
import  { useEffect,useState } from 'react';
import DcotorProfile from './DoctorProfile';
import { useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';



const TodaysAppointments = () => {
  const navigate = useNavigate();
  const [listappointmentData,setListAppointmentData] = useState([]);
  const token = JSON.parse(useSelector((state)=>state.user.token))
  const dispatch = useDispatch();


  useEffect(()=>{

    fetchAppointment()
  
  },[])
  

  const fetchAppointment = async ()=>{
    try{
      console.log(token.refresh);
      const response = await axios.get('http://127.0.0.1:8000/api/doctors/todays-appointment/', {
              headers:{
              'Authorization': `Bearer ${token.access}`
            }
  
      })
      if(response.status === 200){
        setListAppointmentData(response.data)
        console.log(response.data);
    
      }
    }
    catch(error){
      console.log(error.response);
    }
  }


  return (
    <div>
      <div>
        <DcotorProfile/>
      
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
                ADDRESS
              </th>
              <th scope="col" class="px-6 py-3">
                PH.NO
              </th><th scope="col" class="px-6 py-3">
                TIME
              </th>

              <th scope="col" class="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
          {listappointmentData.map((data)=>(<tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    
                    <td class="px-6 py-4">{data.first_name}</td>
                    <td class="px-6 py-4">{data.age}</td>
                    <td class="px-6 py-4">{data.gender}</td>
                    <td class="px-6 py-4">{data.address}</td>
                    <td class="px-6 py-4">{data.phone_number}</td>
                    <td class="px-6 py-4">{data.time}</td>
                    <td class="px-6 py-4">
                    <button  onClick={()=>{navigate(`/chat`, { state: { recieverId:2} })}}  type="button"  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Chat</button>
                    </td>
                  </tr>
                  ))} 
              
          </tbody>-
          
        </table>
      </div>
      </div>
      </div>
    </div>
    </div>
  )
}
export default TodaysAppointments;
