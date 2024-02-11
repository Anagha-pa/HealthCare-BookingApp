import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Doctors.css";
import axios from "axios";
import AdminSideBar from "./AdminSideBar";
import { useSelector } from "react-redux";

const Doctors = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const [qualification, setQualification] = useState("");
  const [gender, setGender] = useState("");
  const [phone_number, setPhonenumber] = useState("");
  const [allDepartment, setAllDepartment] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  


  const adminToken =JSON.parse( localStorage.getItem('adminToken')) || null


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(
        "http://127.0.0.1:8000/api/adminpanel/doctors/",
        {
          name: name,
          department: department,
          experience: experience,
          qualification: qualification,
          gender: gender,
          phone_number: phone_number,
          email:email,
          password:password,
          first_name:name,
          last_name:name
        },
       
        {
          headers: {
            'Authorization': `Bearer ${adminToken.access}`
          },
          
          
        
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        console.log("successful");

          navigate('/listdoctor');
      }
    } catch (error) {
      console.log(error.response);
    }
  };


  const handleDepartmentChange = async () => {
    try {
      const response = await axios.get(

        "http://127.0.0.1:8000/api/adminpanel/departments/",{
          headers: {
            'Authorization': `Bearer ${adminToken.access}`
          },
        }
      );
      console.log("departments", response.data);
      setAllDepartment(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };
  

  useEffect(() => {
    handleDepartmentChange();
  }, []);


  return (
    <div className="whole">
      <AdminSideBar/>
      <div className="sample">
        <form className="doctors-form" onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="name"
              id="floating_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2
           border-gray-300 appearance-none dark:to-black dark:border-gray-600 dark:focus:border-blue-500 
           focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <input
              type="email"
              name="email"
              id="floating_email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2
           border-gray-300 appearance-none dark:to-black dark:border-gray-600 dark:focus:border-blue-500 
           focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label
              for="floating_email"
              className="peer-focus:font-medium absolute text-sm
            text-gray-500 dark:text-gray-400 duration-300 
            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email
            </label>
          </div>



          <div className="relative z-0 w-full mb-6 group">
            <input
              type="password"
              name="password"
              id="floating_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2
           border-gray-300 appearance-none dark:to-black dark:border-gray-600 dark:focus:border-blue-500 
           focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label
              for="floating_password"
              className="peer-focus:font-medium absolute text-sm
            text-gray-500 dark:text-gray-400 duration-300 
            transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
            peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              password
            </label>
          </div>


          <div className="relative z-0 w-full mb-6 group">
            <select
              name="department"
              id="department"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2 border-gray-300 appearance-none
               dark:to-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
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
              type="text"
              name="qualification"
              id="floating_text"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2
           border-gray-300 appearance-none dark:to to-black dark:border-gray-600 dark:focus:border-blue-500
            focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
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
                type="text"
                name="experience"
                id="floating_text"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2
             border-gray-300 appearance-none dark:to to-black dark:border-gray-600 dark:focus:border-blue-500 
            focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
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
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
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
                type="tel"
                pattern="[0-9]{10}"
                name="phone_number"
                id="floating_phone"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-1 border-b-2
             border-gray-300 appearance-none dark:to to-black dark:border-gray-600 dark:focus:border-blue-500
              focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={phone_number}
                onChange={(e) => setPhonenumber(e.target.value)}
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
  );
};
export default Doctors;
