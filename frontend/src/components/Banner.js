import React from 'react'
import {SlNote} from "react-icons/sl"
import {GiBookmarklet} from "react-icons/gi"
import {BsChatText} from "react-icons/bs"
import Lottie from 'lottie-react';
import animation1 from '../assest/animation1.json'
import animation from '../assest/animation.json'
import animation3 from '../assest/animation3.json'
import animation4 from '../assest/animation4.json'
import animation5 from '../assest/animation5.json'


const Banner = () => {
  return (
    <div>



<div className="h-auto bg-gray-50 flex items-center">
  {/* <img src={imgvector} width={'500px'} height={'300px'} /> */}
  <Lottie animationData={animation1} />

  <div className="flex flex-col justify-evenly pl-10 w-1/2">
  <h5 class="mb-4 text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white">Appointment management system</h5>
    <p>
      Handling patient bills and appointments used to be a chaotic scene in hospitals and clinics. Not anymore! With the arrival of DocPulse’s Clinic Management Software, a systematic process has evolved over time. The best part of this software is that it has reduced the use of paper, keeping all important information in one place to access. Doctors could coordinate with other departments with great ease, regarding medical health records. The software has helped in saving time as prescriptions, bills, and other calculations are maintained digitally. This helps doctors concentrate on their core activities.
    </p>
  </div>
</div>


<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
      <div class="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Our Features</h2>
          <p class="font-light text-gray-500 lg:mb-16 sm:text-xl dark:text-gray-400">The Leading Clinic Management System in India Manage Appointments,
 Bills, Payments and Patient Data with Ease!</p>
      </div> 
      <div class="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          <div class="items-center bg-white rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <Lottie animationData={animation} />
              </a>
              <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="#">Book Apponitment</a>
                  </h3>
                  
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">Patients can easily schedule appointments with their preferred doctors or specialists using the system.</p>
                 
              </div>
          </div> 
          <div class="items-center bg-white rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                 <Lottie animationData={animation3}/>
              </a>
              <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="#">Appointment History</a>
                  </h3>
                  
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">The system maintains a secure database of patient records, ensuring easy access to patient history, treatment plans, and contact information.</p>
                 
              </div>
          </div> 

          <div class="items-center bg-white rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <Lottie animationData={animation4}/>
              </a>
              <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="#">Community chat</a>
                  </h3>
                  
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">The system provides a secure and private communication channel for patients to engage in real-time chats with healthcare providers. </p>
                 
              </div>
          </div> 

           <div class="items-center bg-white rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700">
              <a href="#">
                  <Lottie animationData={animation5}/>
              </a>
              <div class="p-5">
                  <h3 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      <a href="#">Our Doctors</a>
                  </h3>
                  
                  <p class="mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">The system provides a secure and private communication channel for patients to engage in real-time chats with healthcare providers. </p>
                 
              </div>
          </div> 

      </div>  
  </div>
</section>

    

     

    </div>
  )
}
export default Banner;
