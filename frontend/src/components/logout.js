import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./logout.css";
import { logout, selectUser } from "../features/userSlice";  //import logout and setToken actions
import {  useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Dna } from  'react-loader-spinner'

const Logout = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  
  useEffect(() => {

    dispatch(logout());  //dispath the logout action
    navigate('/login')
    
    
  
    
  }, [])
  
   
  return null

};

export default Logout; 