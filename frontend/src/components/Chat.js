import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { useSelector, useDispatch } from 'react-redux';


const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const token = JSON.parse(useSelector((state) => state.user.token));
  const {state}=useLocation();
  const recieverId = state.recieverId
  const storedToken = localStorage.getItem('token');
  
    const decodedToken = jwt_decode(storedToken);
    const accessToken = decodedToken.access;
  console.log(decodedToken.user_id);
  
   

  const user = jwt_decode(token.access);
  const user_id = user.email; // Assuming 'user_id' is the key in your decoded token containing the user's ID

  const roomName = `chat${user.user_id}-`;

  useEffect(() => {
    console.log(recieverId);
    const chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${recieverId}/${decodedToken.user_id}/`);

    chatSocket.onopen = () => {
      console.log('WebSocket connected');
      setSocket(chatSocket);
    };

    chatSocket.onmessage = (e) => {
      console.log('Received message:', e.data);
      const messageData = JSON.parse(e.data);
      setChatMessages([...chatMessages, messageData]);
    };

    return () => {
      chatSocket.close();
    };
  }, [chatMessages]);
  console.log("recieverId",recieverId);
  const sendMessage = () => {
    if (socket && message.trim() !== '') {
      socket.send(JSON.stringify({ message, user_id })); // Include user_id in the message data
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-4">
        {chatMessages.map((msg, index) => (
          <div
            key={index}
            className="rounded-lg p-2 mb-2 bg-blue-100 text-blue-900"
          >
              {msg.user_id}
              <br />

            {msg.message}
          
          </div>
        ))}
      </div>
      <div className="p-4">
        <input
          type="text"
          className="border rounded-md p-2 w-full"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button
          className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;







// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import jwt_decode from "jwt-decode";
// import { useSelector,useDispatch } from 'react-redux';



// const Chat = () => {
//   const [message, setMessage] = useState('');
//   const [chatMessages, setChatMessages] = useState([]);
//   const [socket, setSocket] = useState(null);
//   const token = JSON.parse(useSelector((state)=>state.user.token))


//   const user = jwt_decode(token.access);

  

//   const roomName = 'common'
  
//   useEffect(() => {
//     const chatSocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomName}/`);
    
//     chatSocket.onopen = () => {
//       console.log('WebSocket connected');
//       setSocket(chatSocket);
//     };
  
//     chatSocket.onmessage = (e) => {
//       console.log('Received message:', e.data);
//       const messageData = JSON.parse(e.data);
//       setChatMessages([...chatMessages, messageData]);
//     };
  
//     return () => {
//       chatSocket.close();
//     };
//   }, [chatMessages]);
  

//   const sendMessage = () => {
//     if (socket && message.trim() !== '') {
//       socket.send(JSON.stringify({ message }));
//       setMessage('');
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen">
//       <div className="flex-grow p-4">
//         {chatMessages.map((msg, index) => (
//           <div
//             key={index}
//             className="rounded-lg p-2 mb-2 bg-blue-100 text-blue-900"
//           >
//             {msg.message}
//           </div>
//         ))}
//       </div>
//       <div className="p-4">
//         <input
//           type="text"
//           className="border rounded-md p-2 w-full"
//           placeholder="Type your message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === 'Enter') {
//               sendMessage();
//             }
//           }}
//         />
//         <button
//           className="mt-2 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
//           onClick={sendMessage}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
