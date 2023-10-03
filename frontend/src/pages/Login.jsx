import React from 'react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className='login'>
      <section>
        <form>
            <input type='email' placeholder='Enter Email-id' />
            <input type='password' placeholder='Enter password' />
            <button type='submit'>Login</button>
            <h4>Or</h4>
            <Link to={'/register'}>Sign Up</Link>
        </form>
      </section>
    </div>
  )
}
