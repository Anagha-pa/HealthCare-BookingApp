import React, { Fragment } from "react"
import Header from "../components/Header";
import './HomePage.css'
import backgroundImage from '../assest/bgimg2.jpg' 
import { Link } from "react-router-dom";
import Appointment from "../components/Appointment";
import Banner from "../components/Banner";
import  Footer  from "../components/Footer";

const Home = () => {
    return (
        <Fragment>
            <Header/>
        <div className="home" style={{ backgroundImage: `url(${backgroundImage})` }}>
           
         
                <div className='home__content'>

                        <div className="">
                        <p className="heading"><b>Welcome to Home Page</b></p>
                        <p className="para">Welcome to our Hospital Management System,<br />
                        your one-stop solution for efficient healthcare <br />
                        administration.
                        </p>
                        <div className="home__buttons">
                                <Link  to={"/appointment" } className="home__button">Book Appointment</Link>
                                <Link to={'/appointment-history'} className="home__button">View Appointments</Link>
                                <Link to={'/chat'} className="home__button">Chat With Doctors</Link>
                            </div>
                        </div>              
            </div>
              
        </div>
        <Banner/>
        <Footer/>
        </Fragment>
    );
}

export default Home;
