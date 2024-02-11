import React, { useEffect,useState } from 'react';
import './ListAppointments.css';
import Header from '../components/Header';
import AxiosInstance from './AxiosInstance';
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import Appointment from './Appointment';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';

const ListAppointments = () => {

  // const Axios = AxiosInstance();
  const [listappointmentData,setListAppointmentData] = useState([]);
  const token = JSON.parse(useSelector((state)=>state.user.token))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  

  useEffect(()=>{

    fetchAppointment()
  
  },[])

const fetchAppointment = async ()=>{
  try{
    console.log(token.refresh);
    const response = await axios.get('http://127.0.0.1:8000/api/users/appointment/list-appointment/', {
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

  const handleChange = async (id)=>{
    try{
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/users/appointment/appointment-status/${id}/`,
        {},
        {
          headers:{
            'Authorization': `Bearer ${token.access}`
          }
        }
      )
      if(response.status === 200){
        // Update the status of the appointment in the local state
        const updatedList = listappointmentData.map((appointment) => {
          if (appointment.id === id) {
            return { ...appointment, status: 'Cancelled' };
          }
          return appointment;
        });
        setListAppointmentData(updatedList);

        // Dispatch an action to update the Redux store (if needed)
        dispatch({ type: 'UPDATE_APPOINTMENTS', payload: updatedList });
      }
    }
    catch(error){
      console.log(error.response);
    }
  }
  console.log(listappointmentData);
  const handleChat = async()=>{

  }


  return (
    <div className='list-ap'>
      <Header />
      
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Department
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Doctor
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Fee
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Status
                        </th>   
                        <th scope="col" className="px-6 py-3">
                            contact
                        </th> 
                        
                    </tr>
                </thead>
                <tbody>
            {listappointmentData.map((appointment) => (
              <tr key={appointment.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover-bg-gray-600">
                <td className="px-6 py-4">{appointment.first_name}</td>
                <td className="px-6 py-4">{moment(appointment.slot_date).format("MMMM DD, YYYY")}</td>
                <td className="px-6 py-4">{appointment.department}</td>
                <td className="px-6 py-4 text-right">{appointment.doctor_name}</td>
                <td className="px-6 py-4">{appointment.fee}</td>
                <td className="px-6 py-4">
                  {appointment.status ? 'Cancelled' : (
                    <button
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 mt-2 dark:bg-blue-600 dark:hover-bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                      onClick={() => handleChange(appointment.id)}
                    >
                      Cancel
                    </button>
                  )}
                </td>
                <td className="px-6 py-4">
                <button  onClick={()=>{navigate(`/chat`, { state: { recieverId:appointment.doctor} })}}  type="button"  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Chat</button>
                
                </td>
              </tr>
            ))}
          </tbody>
            </table>
        </div>
    

    </div>
  );
};

export default ListAppointments;
