import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Context, server} from '../main'
import toast from 'react-hot-toast'

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAthenticated } = useContext(Context);
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();

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
            setIsAthenticated(true);
        } catch(error){
            toast.error("Error in registration");
            console.log(error);
            setIsAthenticated(false);

        }
    }
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
            <button type='submit'>Sign Up</button>
            <h4>Or</h4>
            <Link to={'/login'}>Login</Link>
        </form>
      </section>
    </div>
  )
}
