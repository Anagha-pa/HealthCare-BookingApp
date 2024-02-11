import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AdminSideBar from './AdminSideBar';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const EditDoctorData = () => {
  const location = useLocation("");
  const navigate = useNavigate("");
  const doctor = location&&location.state ? location.state.data: null;
  const[allDepartment,setAllDepartment]=useState("");
  const adminToken =JSON.parse( localStorage.getItem('adminToken')) || null

  const[editedDoctor,setEditedDoctor] = useState({
    first_name: doctor?.first_name || " ",
    department: doctor?.department || "",
    experience: doctor?.experience || "",
    qualification : doctor?.qualification || "", 
    gender : doctor?.gender || "",
    phone_number : doctor?.phone_number || "",
    
  });

  const handleInputChange = (e) => {
    console.log(e.target.value);
    const { name, value } = e.target;
    setEditedDoctor({
      ...editedDoctor,
      [name]: value,
    });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
       const response =await axios.patch(`http://127.0.0.1:8000/api/adminpanel/doctor-updation/${doctor.id}/`,
       editedDoctor,
       {

       headers:{
        'Authorization': `Bearer ${adminToken.access}`
     },
      
    }
      );
      if(response.status ===200){
        toast.success("success")
        navigate('/listdoctor')
      }
     
    }catch(error){
      console.error(error.response);
    }
  };
  console.log(editedDoctor);
  const handleDepartmentChange = async (e)=>{
  
    try{
      const response =  await axios.get('http://127.0.0.1:8000/api/adminpanel/departments/',{
        headers:{
          'Authorization': `Bearer ${adminToken.access}`
       }
      }
      
      )
      if(response.status ===200){
        setAllDepartment(response.data)
        console.log(response.data);
      }
    }
    catch(error){
      console.log(error.response);
    }
  }
  useEffect(()=>{
    if (location.state===null){
      navigate('/listdoctor')
    }
    handleDepartmentChange();
 
   
  },[])



  return (
    <div className="whole">
    <AdminSideBar/>
    <div className="sample">
      <form className="doctors-form" onSubmit={handleSubmit} >
        <div className="relative z-0 w-full mb-6 group">
          <input
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2
         border-gray-300 appearance-none dark:to-black dark:border-gray-600 dark:focus:border-blue-500 
         focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=""
            type="text"
            name = "first_name"
            value={editedDoctor.first_name}
            onChange={handleInputChange}            
            required
          />

          <label
            for="floating_name"
            className="peer-focus:font-medium absolute text-sm
          text-gray-500 dark:text-gray-400 duration-300 
          transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
          peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
          Name
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <select
            
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none
             dark:to-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
             type = "text"
             name="department"
             value={editedDoctor.department}
             onChange={handleInputChange}
            required>

            <option  value=""></option>
            {allDepartment&&allDepartment.map((dept) => (
              <option key={dept.id} value={dept.name}>
                {dept.name}
              </option>
            ))}
          </select>

          <label
            for="floating_password"
            className="peer-focus:font-medium absolute text-sm
         text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
         peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100
         peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 first-letter:" >
            department
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <input

            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2
         border-gray-300 appearance-none dark:to to-black dark:border-gray-600 dark:focus:border-blue-500
          focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          type="text"
          name="qualification"
          value={editedDoctor.qualification}
          onChange={handleInputChange}
            required
          />

          <label
            for="floating_repeat_password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 
        duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
         peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
         peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            qualification
          </label>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
        
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2
           border-gray-300 appearance-none dark:to to-black dark:border-gray-600 dark:focus:border-blue-500 
          focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          type="text"
          name="experience"
          value={editedDoctor.experience}
          onChange={handleInputChange}
              required
            />

            <label
              for="floating_phone"
              class="peer-focus:font-medium absolute text-sm text-gray-500
           dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Experience
            </label>
          </div>
          <div className='bind'>   
            <div>
              <label className='labels'>Gender</label>
            </div>
            <div>
              <select
                className="form-control"
                name='gender'
                value={editedDoctor.gender}
                onChange={handleInputChange}
               
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              
              pattern="[0-9]{10}"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2
           border-gray-300 appearance-none dark:to to-black dark:border-gray-600 dark:focus:border-blue-500
            focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            type="tel"
            name="phone_number"
            value={editedDoctor.phone_number}
            onChange={handleInputChange}
              required
            />

            <label
              for="floating_phone"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 
          transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600
           peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
           peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Phone number{" "}
            </label>
          </div>
     
          
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
          focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"

        >
          Submit
        </button>
      </form>
    </div>
  </div>
  )
}
export default EditDoctorData;
