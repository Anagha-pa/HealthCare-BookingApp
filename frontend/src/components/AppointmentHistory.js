import React, { useEffect, useState } from 'react'
import './AppointmentHistory.css'
import Header  from './Header'
import axios from 'axios';
import { useSelector,useDispatch } from 'react-redux';
import moment from "moment";

const AppointmentHistory = () => {


  const [appointmentData,setAppointmentData] = useState([]);
  const token = JSON.parse(useSelector((state)=>state.user.token))
  



  useEffect(()=>{
      fetchData()
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/appointment-history/', {
        headers: {
          'Authorization': `Bearer ${token.access}`
        }
      });
      if (response.status === 200) {
        setAppointmentData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  }
  


  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <Header/>
  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-6 py-3">
          NAME
        </th>
        <th scope="col" className="px-6 py-3">
          AGE
        </th>
        <th scope="col" className="px-6 py-3">
          GENDER
        </th>
        <th scope="col" className="px-6 py-3">
          DATE
        </th>
        <th scope="col" className="px-6 py-3">
          DEPARTMENT
        </th>
        <th scope="col" className="px-6 py-3">
          DOCTOR
        </th>
        <th scope="col" className="px-6 py-3">
          FEE
        </th>
        <th scope="col" className="px-6 py-3">
          PAYMENT STATUS
        </th>
        <th scope="col" className="px-6 py-3">
          <span className="sr-only">Edit</span>
        </th>
      </tr>
    </thead>
    <tbody>
      {appointmentData.map((appointment, index) => (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
          <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {appointment.first_name} {appointment.last_name}
          </td>
          <td className="px-6 py-4">
            {appointment.age}
          </td>
          <td className="px-6 py-4">
            {appointment.gender}
          </td>
          <td className="px-6 py-4">
            {moment(appointment.slot_date).format("MMMM DD, YYYY")}
          </td>
          <td className="px-6 py-4">
            {appointment.department}
          </td>
          <td className="px-6 py-4">
            {appointment.doctor_name}
          </td>
          <td className="px-6 py-4">
            {appointment.fee}
          </td>
          <td className="px-6 py-4">
            {appointment.payment_status ? 'Paid' : 'Not Paid'}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  )
}
export default AppointmentHistory
