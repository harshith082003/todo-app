import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);


  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);

    console.log(email, password);

    try{
        const { data } = await axios.post(`${server}/users/login`, { 
        email, 
        password
        },{
        headers:{
            "Content-Type": "application/json"
        },
        withCredentials: true,
        })

        toast.success(data.message);
        setIsAuthenticated(true);
        setLoading(false);

    } catch(error){
        toast.error(error.response.data.message);
        console.log(error);
        setIsAuthenticated(false);
        setLoading(false);

    }

  }

  if(isAuthenticated) return <Navigate to={'/'}/>

  return (
    <div className='login'>
      <section>
        <form onSubmit={handleLogin}>
            <input 
                type='email' 
                value = {email} 
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter Email-id' 
                required
            />
            <input 
                type='password' 
                value = {password} 
                onChange={e => setPassword(e.target.value)}
                placeholder='Enter password' 
                required
            />
            <button disabled = {loading} type='submit'>Login</button>
            <h4>Or</h4>
            <Link to={'/register'}>Sign Up</Link>
        </form>
      </section>
    </div>
  )
}
