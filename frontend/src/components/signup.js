import React, { useEffect, useState } from "react";
import "./signup.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
// import { signup } from "../features/userSlice";
import { setToken }  from  "../features/userSlice"; // Import setToken action
import axios from "axios";
import { Dna } from  'react-loader-spinner'
import toast from "react-hot-toast";


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state
  const [passwordMatchError] = useState(false);
  const token = useSelector((state)=>state.user.token)
  const [loading,setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();




  useEffect(()=>{
    if (token){
      navigate("/")
    }                                   


  }, [])

  

  const sendOtp = async () => {
    try {
      const email = localStorage.getItem("email");

      if (email) {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/users/send-otp/",
          { email },
          {}
        );

        if (response.status === 200) {
          toast.success("OTP sent successfully");
        }
      } else {
        toast.error("Email not found");
      }
    } catch (error) {
      toast.error("Failed to send OTP");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      setLoading(true)
      const response = await axios.post('http://127.0.0.1:8000/api/users/register/', {
         "first_name":name,
         "last_name" :name,
          "email":email,
          "password":password,
        
  
      });
        console.log(response  );
      if(response.status===201){
        try{
          localStorage.setItem('email',email)
          sendOtp()

          navigate('/verify-otp')

        }catch(error){
          console.log(error.response);
        }
            
        console.log("helo");
      
        // const loginResponse = await axios.post('http://127.0.0.1:8000/api/token/',{
        //   email,
        //   password
        // });
        // localStorage.setItem('email', email)

        // const token = loginResponse.data; 
        // localStorage.setItem('token', JSON.stringify(token))
        // dispatch(setToken(token));

      }
      
  
  
      }
      catch(error){
        console.log(error.response);
  
      }
      finally{
        setLoading(false)
      }

  };

  return (
    <div className="signup">
      <form className="signup_form" onSubmi
      t={handleSubmit}>
        <h1>Sign Up</h1>
                {loading&&(<Dna
          visible={true}
          height="80"
          width="80"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper"
        />)}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
         {passwordMatchError && <p className="error">Incorrect Password</p>}
        <button type="submit" className="submit_btn">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Signup;