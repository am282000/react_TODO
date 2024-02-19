import React, { useContext, useState } from 'react'
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { Context, baseURL } from '../main';
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const {isAuthenticated,setIsAuthenticated,loading,setLoading} = useContext(Context);

  const registerHandler = async (e)=>{
    setLoading(true)
    try {
      e.preventDefault();
      console.log("Final Form", {name, email, password});
      //Register API call
       const {data} = await axios.post(`${baseURL}/users/register`, {name, email, password},{
        withCredentials: true
       })
       console.log(data);
      toast.success(data.msg)
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
        <form onSubmit={registerHandler}>
          <input type="text" placeholder='Enter your Name' required value={name} onChange={(e)=>{setName(e.target.value)}}/>
          <input type="email" placeholder='Enter your Email' required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          <input type="password" placeholder='Enter your Password' required value={password} onChange={(e)=>{setPassword(e.target.value)}} />
          <button type='submit' disabled={loading}>Sign Up</button>
          <Link to="/login" className="btn-link"> Login</Link>
        </form>
      </section>
    </div>
  )
}

export default Register