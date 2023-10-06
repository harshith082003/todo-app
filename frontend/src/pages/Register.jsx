import React, {useContext, useState} from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import {Context, server} from '../main'
import toast from 'react-hot-toast'

export default function Register() {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        console.log(name, email, password);

        try{
            const { data } = await axios.post(`${server}/users/new`, {
            name, 
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
        <form onSubmit={handleRegisterSubmit}>
            <input 
                type='text' 
                value = {name} 
                onChange={e => setName(e.target.value)}
                placeholder='Enter your name' 
                required
            />
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
                placeholder='Create password' 
                required
            />
            <button disabled = {loading} type='submit'>Sign Up</button>
            <h4>Or</h4>
            <Link to={'/login'}>Login</Link>
        </form>
      </section>
    </div>
  )
}
