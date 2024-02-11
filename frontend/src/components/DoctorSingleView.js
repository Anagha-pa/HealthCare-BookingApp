import React, { useEffect, useState } from 'react';
import Headers from './Header';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import Footer from "../components/Footer";


const DoctorSingleView = () => {
  const location = useLocation();
  const doctor = location && location.state ? location.state.data : null;

  const [doctorsdetails, setDoctorsdetails] = useState([]); // Initialize as an empty array
  const token = JSON.parse(useSelector((state)=>state.user.token))

  const fecthDocDetails = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/users/single-doctor/${doctor.id}/`,{
          headers: {
            'Authorization': `Bearer ${token.access}`
          }
        }
      );
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          // Check if the response data is an array
          setDoctorsdetails(response.data);
        } else {
          // If not an array, set it as a single item in an array
          setDoctorsdetails([response.data]);
        }
        console.log(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  useEffect(() => {
    fecthDocDetails();
  }, []);

  return (
    <div className='bg-green-100' >
      <Headers />
    <div className="flex flex-col items-center justify-center h-screen">    
      <div className="flex items-center justify-center h-3/4 w-3/4 screen">
        <div className="mt-5 ml-20 mr-20  bg-red-200 h-full w-full">
          <div className="flex justify-between gap-x-2 py-8">
            <div className="flex min-w-0 gap-x-2 ml-20">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-300"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              {doctorsdetails.map((doctor) => (
                <div className="min-w-0 flex-auto" key={doctor.id}>
                  <p className="text-xl font-semibold leading-6 text-gray-900">Name  :  {doctor.first_name}</p>
                  <p className="mt-1 truncate text-sm leading-5 text-gray-800">Qualification  :  {doctor.qualification}</p>
                  <p className="mt-1 truncate text-sm leading-5 text-gray-800">Department  :  {doctor.department}</p>
                  <p className="mt-1 truncate text-sm leading-5 text-gray-800">Experience  :  {doctor.experience} years</p>
                  <p className="mt-1 truncate text-sm leading-5 text-gray-800">Gender  :  {doctor.gender}</p>
                  <p className="mt-1 truncate text-sm leading-5 text-gray-800">Phone number  :  {doctor.phone_number}</p>
                  <p className={`mt-1 truncate text-sm leading-5 text-gray-800 ${doctor.available? `text-green-400`:`text-red-500`} ` }>  {doctor.available? "Available" : "Not Available"}</p>
                </div>
              ))}
            </div> 
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  )
}
export default DoctorSingleView;
