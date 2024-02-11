import React, { useEffect, useState } from "react";
import "./Appointment.css";
import Headers from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Footer from "../components/Footer";
import Lottie from 'lottie-react';
import page2animation from "../assest/page2animation.json"

const Appointment = () => {
  const navigate = useNavigate();
  const [first_name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [phone_number, setPhonenumber] = useState();
  const [address, setAddress] = useState("");
  const [department, setDeparment] = useState("");
  const [doctor, setDoctor] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 4);
  const [fee, setFee] = useState("");
  const [time, setTime] = useState("");
  const [allDepartment, setAllDepartment] = useState(null);
  const [allDoctors, setAllDoctors] = useState([]);
  const [allFee, setAllFee] = useState(null);
  const token = JSON.parse(useSelector((state) => state.user.token)) || null;
  const [isSlotAvailable, setIsSloteAvailable] = useState(true);
  const [slotDate,setSlotDate] = useState(null);


  const handleDateChange = (date) => {
    setStartDate(date);
  };


  useEffect(() => {
    if (startDate > endDate) {
      setIsSloteAvailable(false);
    } else {
      setIsSloteAvailable(true);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    console.log(fee);
  }, [department, doctor]);

  // Calculate 'amount' based on the 'fee' state
  const amount = parseFloat(fee);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(doctor);
    if (!isSlotAvailable) {
      alert("There are no slots available");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/appointment/",
        JSON.stringify({
          first_name: first_name,
          last_name: first_name,
          age: age,
          gender: gender,
          phone_number: phone_number,
          address: address,
          department: department,
          doctor: doctor,
          slot_date: startDate,
          fee: fee,
          time: time,
        }),
        {
          headers: {
            Authorization: `Bearer ${token.access}`,
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
      
      
      if (response.status === 201) {
        console.log("successful");
        console.log("Response data:", response.data);
        setSlotDate(response.data.count)
        if (response.data.count >= 10){
          alert("appointment closed")
        }
        else{
          showRazorpay();
        }


        
      }
    } catch (error) {
      console.log(error.response);
    }
  };







  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));

      await axios.post(
        "http://127.0.0.1:8000/api/payments/payment/success/",
        bodyData
      );
    } catch (error) {
      console.log(console.error());
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const showRazorpay = async () => {
    try {
      await loadScript();
      let amount = fee;

      // Define 'amount' based on the 'fee' state
      const amountInPaise = Math.round(amount * 100);

      const response = await axios.post(
        "http://127.0.0.1:8000/api/payments/pay/",
        {
          amount: fee,
          name: first_name,
        }
      );

      // in data we will receive an object from the backend with the information about the payment
      //that has been made by the user

      const options = {
        key_id: process.env.REACT_APP_PUBLIC_KEY, // Your Razorpay public key
        amount: amountInPaise,
        currency: "INR",
        name: "Org. Name",
        description: "Test transaction",
        image: "", // Add image URL
        order_id: response.data.payment.id,
        handler: function (response) {
          // Handle success by calling handlePaymentSuccess and passing the response
          handlePaymentSuccess(response);
        },
        prefill: {
          name: "User's name",
          email: "User's email",
          contact: "User's phone",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error(error.response);
    }
  };

  const handleDepartmentChange = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/adminpanel/departments/"
      );
      console.log("departments", response.data);
      setAllDepartment(response.data);
      handleFeeChange();
    } catch (error) {
      console.log(error.response);
    }
  };
  const handleDoctorChange = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/adminpanel/doctors/", {
        headers: {
          'Authorization': `Bearer ${token.access}`
        }
      });
      console.log("doctors", response.data);
      setAllDoctors(response.data);
    } catch (error) {
      console.log(error.response);
      setAllDoctors([]); // Set allDoctors to an empty array on error
    }
  };
  
  const handleFeeChange = async () => {
    try {
      if (department) {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/adminpanel/departments/?name=${department}`
        );

        // Log the response data to the console for debugging
        console.log("fees", response.data);

        // Check if a matching department is found in the response
        if (response.data.length > 0) {
          // Assuming each department has a 'fee' field, replace 'fee' with the actual field name if different
          const departmentFee = response.data[0].fee;
          setFee(departmentFee);
          setAllFee(response.data);
        } else {
          // Handle the case where no matching department is found
          console.log("No matching department found");

          // Reset the 'fee' state to an empty string
          setFee("");
        }
      } else {
        // Reset the 'fee' state when the department is not selected
        setFee("");
      }
    } catch (error) {
      // Handle any errors that may occur during the Axios GET request
      console.log(error.response);
    }
  };

  useEffect(() => {
    handleDepartmentChange();

    handleDoctorChange();
  }, []);



  const handleFee = () => {
    if (department) {
      const selectedDepartment = allDepartment.find(
        (dept) => dept.name === department
      );

      if (selectedDepartment) {
        setFee(selectedDepartment.fee);
      } else {
        // Handle the case where no matching department is found
        console.log("No matching department found");
        setFee(""); // Reset the fee to an empty string
      }
    } else {
      setFee(""); // Reset the fee when the department is not selected
    }
  };

  useEffect(() => {
    console.log(allFee);
  }, [allFee]);

  return (
    <div>
      <Headers />

      <div className="flex">
        <div className="w-1/2 p-4">
          {/* Your image goes here */}
          <Lottie animationData = {page2animation}/>
        </div>
        <div className="w-1/2 p-4">
          <form className="form-group" onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="text"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={first_name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6 flex flex-wrap">
              <div className="w-full sm:w-1/2 pr-2">
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-full sm:w-1/2 pl-2">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone_number"
                value={phone_number}
                onChange={(e) => setPhonenumber(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-6 flex flex-wrap">
              <div className="w-full sm:w-1/2 pr-2">
                <label
                  htmlFor="department"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Department
                </label>
                <select
                  name="department"
                  value={department}
                  onChange={(e) => {
                    setDeparment(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Department</option>
                  {allDepartment &&
                    allDepartment.map((dept) => (
                      <option key={dept.id} value={dept.name}>
                        {dept.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="w-full sm:w-1/2 pl-2">
                <label
                  htmlFor="doctor"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Doctor
                </label>
                <select
                  name="doctor"
                  value={doctor}
                  onChange={(e) => {
                    setDoctor(e.target.value);
                    handleFee();
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Doctor</option>
                  {allDoctors &&
                    allDoctors.map((doct) => {
                      if (doct.department === department) {
                        return (
                          <option key={doct.id} value={doct.name}>
                            {doct.first_name}
                            
                          </option>
                        );
                      }
                      return null; // Return null for doctors that don't match the condition
                    })}
                </select>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap">
              <div className="w-full sm:w-1/3 pr-2">
                <label
                  htmlFor="fee"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Fee
                </label>
                <input
                  name="fee"
                  // style={{ width: "200px" }}
                  value={fee}
                  onChange={(e) => {
                    setFee(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-full sm:w-1/3 px-2">
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  maxDate={endDate}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div className="w-full sm:w-1/3 pl-2">
                <label
                  htmlFor="time"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Time
                </label>
                <select
                  name="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Time</option>
                  <option value="09:00">9:00 AM - 11:00 AM</option>
                  <option value="15:00">3:00 PM - 5:00 PM</option>
                </select>
              </div>
            </div>

            <button type="submit" class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Appointment;
