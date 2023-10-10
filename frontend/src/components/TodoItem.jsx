import React from 'react'

export default function TodoItem({ title, description, isCompleted}) {
  return (
    <div className='todo'>
      
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <input type='checkbox' checked = {isCompleted} />
        <button className='btn'>Delete</button>
      </div>
    </div>
  )
}
