import React from 'react'
import {GrFacebook} from 'react-icons/gr'
import {AiFillTwitterSquare} from 'react-icons/ai'
import {FaSquareInstagram} from 'react-icons/fa6'

const Footer = () => {
  return (
    



      
       
      <footer class= "bg-blue-900 h-auto  dark:bg-gray-900 ">
      
     
              <div class="sm:flex sm:items-center sm:justify-between">
              <ul class="flex-1 items-center mb-6 text-sm font-medium text-white ml-10 mt-6 ">
                      <li>
                          <a href="#" class="mr-4 hover:underline md:mr-6 justify-evenly ">HSM,91080 WORKSPACE (JPN),</a>
                      </li>
                      <li>
                          <a href="#" class="mr-4 hover:underline md:mr-6 justify-evenly"># 951, 24th Main Road, Marenahalli, 2nd Phase,</a>
                      </li>
                      <li>
                          <a href="#" class="mr-4 hover:underline md:mr-6 ">J. P. Nagar, Bengaluru, Karnataka 560078</a>
                      </li>
                      <li>
                          <a href="#" class="mr-4 hover:underline md:mr-6 ">contactus@docpulse.com</a>
                      </li>
                      <li>
                          <a href="#" class="mr-4 hover:underline md:mr-6 ">0879580078</a>
                      </li>
                      <li>
                          <a href="#" class="mr-4 hover:underline md:mr-6 ">Privacy Policy</a>
                      </li>
                      
                  </ul>



                  <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 ">
                      <li>
                          <GrFacebook size={'2.5em'}/>
                      </li>
                      <li>
                      <AiFillTwitterSquare  size={'3em'}/>
                      </li>
                      <li>
                      <FaSquareInstagram size={'3em'}/>
                      </li>
                  </ul>
            
              </div>
              <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <span class="block text-sm text-white sm:text-center dark:text-gray-400">© 2023 <a href="" class="hover:underline">Hospital Management™</a>. All Rights Reserved.</span>
         
      </footer>


       
        
 
  )
}
export default Footer;
