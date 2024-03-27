'use client'
import { createContext, useContext, useEffect, useState } from "react";
import { postSocialLogin, postLogin, postLogout } from '@/utils/api'
import { useRouter } from "next/navigation";

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const router = useRouter()
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(()=>{
      // Check authentication status on page load
      // Fetch data from localStorage or cookies
      updateUser()
    }, [])

    const updateUser = ()=>{
      setLoading(true)
      const sessionUser = document.cookie.split("; ").find((row) => row.startsWith("user="))?.split("=")[1];
      if (sessionUser) {
        let user = JSON.parse(decodeURIComponent(sessionUser))
        setUser(user)
      }else{
        setUser(null)
      }
      setLoading(false)
    }

    const login = (userData, loginCallBack) => {
      postLogin(userData)
      .then((response) => {
        loginCallBack(response)
      })
      .catch((error) => {
        console.log('Error while login in.');
        console.log(error)
      })
    };

    const socialLogin = (info)=>{
      postSocialLogin(info)
        .then(response => {
            if (response.status === 200) {
                updateUser()
                router.replace(`/customer`);
            }
        })
        .catch((error) => {
            console.log('An Error while submitting creds');
            console.log(error);
        })
    }
  
    const logout = () => {
      postLogout({})
        .then((response) => {
            if (response.status === 200){
                updateUser()
                router.push("/")
            }
        })
        .catch((error) => {
            console.log(error);
        })
    };
  
    return (
      <AuthContext.Provider value={{ user, login, socialLogin, logout, updateUser }}>
        {children}
      </AuthContext.Provider>
    );
  };

  export const useAuthContext = () => {
    return useContext(AuthContext);
  };