import React,{ useState } from 'react';
import axios from 'axios';

const ResendOTP = () => {

   const [isLoading, setIsLoading] = useState(false);
   const [message, setMessage] = useState('');

   const handleResendOTP = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users/resend-otp/');
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Failed to resend OTP.');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      {isLoading ? (
        <p>Resending OTP...</p>
      ) : (
        <>
          <button onClick={handleResendOTP} disabled={isLoading}>
            Resend OTP
          </button>
          <p>{message}</p>
        </>
      )}
    </div>
  )
}
export default ResendOTP;
