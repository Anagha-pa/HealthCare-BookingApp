import { createContext,useState,useEffect, useContext } from 'react'

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children})=> {

    const[authTokens,setAuthToken]= useState(null)
    const[user,setUser] = useState(null)


    const loginUser = async(e) => {
         
        e.preventDefault()
        const response = await fetch ("http://127.0.0.1:8000/api/token/",{
            method:'POST',
            headers:{
                'content-Type':'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value,'password':e.target.password.value})
        })
        const data = await response.json()
        console.log('data:',data)
    }
   
    const contentData = {
        loginUser : loginUser
    }

    const contextData ={

    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )


}

