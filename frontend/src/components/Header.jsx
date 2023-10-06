import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../main'

export default function Header() {

  const { isAuthenticated, setIsAthenticated } = useContext(Context);

  return (
    <nav className='header'>
      <div>
        <h2>The Todo App</h2>
      </div>
      <article>
        <Link to={'/'}>Home</Link>
        <Link to={'/profile'}>Profile</Link>
        {
          isAuthenticated ? 
            <button className='btn'>Logout</button>
          :
            <Link to={'/login'}>Login</Link>
        }
      </article>
    </nav>
  )
}
 