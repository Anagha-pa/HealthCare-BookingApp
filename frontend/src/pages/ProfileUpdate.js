import React, {useState,useEffect} from 'react';
import axios from 'axios';
import SideBar from "../components/SideBar";
import {Link,useNavigate } from 'react-router-dom';

const ProfileUpdate = () => {
    const [formData,setFormData] = useState({   //state for form fields
        firstName:'',
        lastName:'',
        age:'',
        email:'',
        address:'',
    });
      
    // state to manage the success message after updating
    const [updateSuccess,setUpdateSuccess] = useState(false);

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/users/profile-update/").then((response)=>{
            const userData = response.data;
            setFormData({
                firstName:userData.first_name,
                lastName :userData.last_name,
                age: userData.age,
                email: userData.email,
                address: userData.address,
            });
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        }); 
    },[]);


    const handleInputChange = (e) => {
      const {name,value} = e.target;
      setFormData({...formData,[name]:value});
    };

    const navigate = useNavigate();


    const handleSubmit = (e) =>{
      e.preventDefault();

      axios
      .put('/api/users/profile',formData)
      .then((response) => {
        setUpdateSuccess(true);
        navigate('/profile')
      })
      .catch((error)=>{
        console.error('Error updating profile:',error);
      });
    };



    


  return (
    <div className="flex h-screen">
     <div className="w-full max-w-xs">
  <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        First Name
      </label>
      <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="first_name"/>
    </div>

    <div class="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" >
        Last Name
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="text" placeholder="last_name"/>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" >
        Age
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"type="number" placeholder="age"/>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" >
        Email
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  type="email" placeholder="email"/>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" >
        Password
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="password"/>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" >
        address
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="address"/>
    </div>
   
    <div class="flex items-center justify-between">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
        Update
      </button>
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs">
    &copy;2020 Acme Corp. All rights reserved.
  </p>
</div>
   
</div>

  );
  
}
export default ProfileUpdate;

