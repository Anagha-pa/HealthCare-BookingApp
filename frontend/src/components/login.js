import React, { useEffect, useState } from "react";
import "./login.css";
import { useDispatch, useSelector } from "react-redux";
// import { login } from "../features/userSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken, login } from "../features/userSlice"; // import setToken action
import { Dna } from  'react-loader-spinner'
import { Link } from "react-router-dom";
import jwt_decode from 'jwt-decode';




const Login = () => {
  const token = useSelector((state)=>state.user.token)
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading,setLoding] = useState(false)
  let is_doctor = false
  let user = null
  // const [showOTP, setShowOTP] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(()=>{
  //   if (token){
  //     navigate('/')
  //   }

  // }, [])

 

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    try {
      setLoding(true)
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        email,
        password,
      });
      

      if (response.status === 200) {

        localStorage.setItem('token', JSON.stringify(response.data))
        user = jwt_decode(response.data.access);
        is_doctor = user.is_doctor

        if (is_doctor){
          navigate('/TodaysAppointments')
        }
        else{
          navigate("/");
        }

     
       

      }

      const token = response.data; //Access token from the response
      
      dispatch(setToken(token)); //Dispatch the setToken action

     

      
    } catch (error) {
      console.log(error.response);
    }
    finally{
      setLoding(false)
    }
  };

  return (
    <div className="login">
      <form className="login_form" onSubmit={handleSubmit}>
        <h1>Login</h1>
                  {loading&&(<Dna
            visible={true}
            height="80"
            width="80"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />)}
        {/* <input
          type="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /> */}
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* {!showOTP && (
          <input
            type="otp"
            value={otp}
            placeholder="OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
        )} */}
        <Link  to={'/forgot-password'} > <p className="text-danger">Forgot Password ?</p></Link>
        <button type="submit" className="submit_btn">
          Submit
        </button>
      </form>
       <Link to={'/signup'}><h5>Sign Up</h5></Link>
    </div>
  );
};

export default Login;
