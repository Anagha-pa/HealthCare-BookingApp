import React from "react";
import { Outlet,Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectUser} from "../features/userSlice"

const PrivateRoutes = () => {
    const token = useSelector((state)=>state.user.token)
  
    return token ? <Outlet /> : <Navigate to="/login" />;
  };
export default PrivateRoutes;




 