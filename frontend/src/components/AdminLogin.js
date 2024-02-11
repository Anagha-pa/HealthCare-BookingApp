import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../features/userSlice';

const AdminLogin = () => {
    const navigate = useNavigate();
    const adminToken = useSelector((state)=>(state.admin.token))
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{
        const token = localStorage.getItem('adminToken') || null 
        if(token){
            navigate('/adminprofile')
        }
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        "email":username,
        password,
      });
           
            if (response.status===200){
                console.log(response.data);
                localStorage.setItem('adminToken',JSON.stringify(response.data))
                const adminToken = response.data
                dispatch(setToken(adminToken))
                navigate('/adminprofile');

            }
           
        } catch (error) {
            console.error(error);
            // Handle login error
            // aarth aan enn ariyilla but ith njn angatt edukuva 
            
        }
    };

    return (
        
     <div class="h-full   w-full py-16 px-4">
            <div class="flex flex-col items-center justify-center">
               {/* <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg1.svg" alt="logo"/> */}

                <div class="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16">
                    <p tabindex="0" class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800">Login </p>
                     
                  
                        <div>
                            <label id="email" class="text-sm font-medium leading-none text-gray-800">
                                Email
                            </label>
                            <input aria-labelledby="email"  type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                        </div>
                        <div class="mt-6  w-full">
                            <label for="pass" class="text-sm font-medium leading-none text-gray-800">
                                Password
                            </label>
                           <div class="relative flex items-center justify-center">
                            <input id="pass"  type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}  class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"/>
                            <div class="absolute right-0 mt-2 mr-3 cursor-pointer">
                              <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/sign_in-svg5.svg" alt="viewport"/>                                    
                            </div>
                           </div>
                        </div>
                        <div class="mt-8">
                            <button role="button" type='submit' class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full" onClick={handleSubmit}>log in</button>
                        </div>
                </div>
            </div>
        </div>
    



    
    );
};

export default AdminLogin;
