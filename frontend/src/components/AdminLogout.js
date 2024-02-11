import React from 'react'
import {  useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { logout, selectUser } from "../features/adminSlice"; 

export const AdminLogout = () => {
    const admin = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    useEffect(() => {
  
      dispatch(logout());  //dispath the logout action
      navigate('/adminlogin')
      
      
    
      
    }, [])
    
     
    return null
  
  };
  
  export default AdminLogout; 