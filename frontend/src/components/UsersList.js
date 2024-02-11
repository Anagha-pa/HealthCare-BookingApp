import React, { useState ,useEffect} from 'react'
import AdminSideBar from './AdminSideBar';
import axios from 'axios';

const UsersList = () => {
    const[users,setUsers] = useState("");
    const adminToken =JSON.parse( localStorage.getItem('adminToken')) || null

    const handleSubmit = async(id)=>{
      
      try{
        const response = await axios.patch(
          `http://127.0.0.1:8000/api/adminpanel/user-status/${id}/`,
          {},
          {
            headers:{
              'Authorization': `Bearer ${adminToken.access}`
           }
          }
          );if(response.status ===200){
              console.log("successful");
              fetchUser();
          }
      }catch(error){
        console.log(error)
      }
    }

    const fetchUser = async ()=>{
      try{
        const response = await axios.get(
          "http://127.0.0.1:8000/api/adminpanel/userslist/",{
            headers:{
              'Authorization': `Bearer ${adminToken.access}`
           }
          }
        );
        if(response.status === 200){
          console.log(response.data);
          setUsers(response.data)
        }
      }catch(error){
        console.log(error.response);
      }
    };

useEffect(()=>{
  fetchUser();
},[])




  return (
    <div>
        <AdminSideBar/>
        <div className="container mt-20" style={{display:"flex"}}>
      <div className="col-md-2"></div>
      <div className="col-md-10">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3">
                NAME
              </th>
              <th scope="col" class="px-6 py-3">
                EMAIL
              </th>
              <th scope="col" class="px-6 py-3">
                STATUS
              </th>
              <th scope="col" class="px-6 py-3">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((item) => {
                return (
                  <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                    
                    <td class="px-6 py-4">{item.first_name}</td>
                    <td class="px-6 py-4">{item.email}</td>
                    <td class="px-6 py-4">{item.is_active?"active":"blocked"}</td>
                    <td class="px-6 py-4">
                      {item.is_active? (
                    <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500
                     to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300
                      dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2" onClick={()=>handleSubmit(item.id)}>Block</button> )
                      : ( <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500
                       to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300
                        dark:focus:ring-green-800 font-medium rounded-lg text-sm px-2 py-2.5 text-center mr-2 mb-2"  onClick={()=>handleSubmit(item.id)}>Unblock</button>)
                      }
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      </div>
      </div>
    </div>
  )
}
export default UsersList;
