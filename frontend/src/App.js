import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./components/login";
import Signup from "./components/signup";
import HomePage from './pages/HomePages';
import PrivateRoutes from './Utils/PrivateRoutes';
import Profile from './pages/Profile';
import Logout from "./components/logout";
import OTPVerification from './components/OTPVerification';
import AdminLogin from './components/AdminLogin';
import ProfileUpdate from './pages/ProfileUpdate';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ResendOTP from './components/ResendOTP';
import DoctorProfile from './components/DoctorProfile';
import AdminProfile from './components/AdminProfile';
import {Toaster} from 'react-hot-toast'
import Appointment from './components/Appointment';
import Doctors from './components/Doctors';
import ListAppointments from './components/ListAppointments';
import AppointmentHistory from './components/AppointmentHistory';
import AdminSideBar from './components/AdminSideBar';
import ListDoctor from './components/ListDoctor';
import EditDoctorData from './components/EditDoctorData';
import UsersList from './components/UsersList';
import AppointmentList from './components/AppointmentList';
import Chat from './components/Chat'
import Banner  from './components/Banner';
import Footer from './components/Footer';
import DoctorsView from './components/DoctorsView';
import DoctorSingleView from './components/DoctorSingleView';
import DoctorsLogin from './components/DoctorsLogin';
import TodaysAppointments from './components/TodaysAppointments';
import AdminLogout from './components/AdminLogout';
import DepartmentCreate from './components/DepartmentCreate';
import { ListDepartments } from './components/ListDepartments';
import DcotorProfile from './components/DoctorProfile';


// import { AuthProvider } from './context/AuthContext';





const App = () => {
 

  return (
   <Fragment> <Toaster
   position="top-center"
   reverseOrder={false}/>  
   {/* <AuthProvider/> */}
    <Router>
      <div>
        <Routes>
          
          <Route element={<PrivateRoutes />} >
              <Route exact path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/logout" element={<Logout/>} />
              <Route path="/userForm" element={<userForm/>} />
              <Route path="/profile-update" element={<ProfileUpdate />} />
              <Route path="/doctor-profile" element={<DoctorProfile/>} />
              <Route path="/appointment" element={<Appointment/>} />  
              <Route path="/appointment/list-appointment" element={<ListAppointments/>} />
              <Route path="/appointment-history" element={<AppointmentHistory/>} />                                                                  
              <Route path="/chat" element={<Chat/>}/>
              <Route path="/Banner" element={<Banner/>}/>
              <Route path="/Footer" element={<Footer/>}/>
              <Route path="/DoctorsView" element={<DoctorsView/>}/>
              <Route path="/DoctorSingleView" element={<DoctorSingleView/>}/>
              <Route path="/DoctorsLogin" element={<DoctorsLogin/>}/>
              <Route path="/TodaysAppointments" element={<TodaysAppointments/>}/>
          </Route>

              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/verify-otp" element={<OTPVerification/>} />
              <Route path="/resend-otp" element={<ResendOTP/>} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />



          {/* <Route element={<AdminRoutes/>}> */}
            <Route path="/adminprofile" element={<AdminProfile/>}/>
            <Route path="/AdminLogout" element={<AdminLogout/>}/>
            <Route path="/doctors" element={<Doctors/>} />
            <Route path="/DepartmentCreate" element={<DepartmentCreate/>} />
            <Route path="/ListDepartments" element={<ListDepartments/>} />
            <Route path="/adminsidebar" element={<AdminSideBar/>}/>
            <Route path="/listDoctor" element={<ListDoctor/>}/>
            <Route path="/edit-doctor" element={<EditDoctorData/>}/>
            <Route path="/userslist" element={<UsersList/>}/>
            <Route path="/appointmentlist" element={<AppointmentList/>}/>
            <Route path="/DcotorProfile" element={<DcotorProfile/>}/>
          {/* </Route> */}
           <Route path="/adminlogin" element={<AdminLogin />} />

          

        </Routes>
      </div>
    </Router>
     </Fragment> 

  );
  
 
};
export default App;
