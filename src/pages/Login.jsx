import React, { useContext, useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import { Context, baseURL } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context)

  const loginHandler = async (e)=>{
    setLoading(true)
    try {
      e.preventDefault();
      //Login API
      const {data } = await axios.post(`${baseURL}/users/login`,{email,password},{
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      })
      console.log(data.msg);
      toast.success(data.msg);
      setIsAuthenticated(true)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.msg);
      setIsAuthenticated(false)
      setLoading(false)
    }
  }
  
  if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className='login'>
      <section>
        <form onSubmit={loginHandler} >
          <input type="email" placeholder='Enter your Email' required value={email} onChange={(e)=> setEmail(e.target.value)}/>
          <input type="password" placeholder='Enter your Password' required value={password} onChange={(e)=> setPassword(e.target.value)}/>
          <button type='submit' disabled={loading}>Login</button>
          <Link to="/register" className='btn-link'> Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login