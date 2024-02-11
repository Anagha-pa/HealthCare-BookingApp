import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Link } from "react-router-dom";
import './Profile.css'


const Profile = () => {

  const [user,setUser] = useState([]);

  const fetchUserDetails = async ()=>{
    
  }




  
  return (
    
    <div class="padding">
    <div class="col-md-8">
        <div class="card"> <img class="card-img-top" src="https://i.imgur.com/K7A78We.jpg" alt="Card image cap"/>
            <div class="card-body little-profile text-center">
                <div class="pro-img"><img src="https://i.imgur.com/8RKXAIV.jpg" alt="user"/></div>
                <h3 class="m-b-0">Brad Macullam</h3>
                
                <Link to={"/profile-update"} class="m-t-10 waves-effect waves-dark btn btn-primary btn-md btn-rounded" data-abc="true">Edit Profile</Link>
            </div>
        </div>
    </div>
</div>
  );
};

export default Profile;