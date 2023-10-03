import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <nav className='header'>
      <div>
        <h2>The Todo App</h2>
      </div>
      <article>
        <Link to={'/'}>Home</Link>
        <Link to={'/profile'}>Profile</Link>
        <Link to={'/login'}>Login</Link>
      </article>
    </nav>
  )
}
