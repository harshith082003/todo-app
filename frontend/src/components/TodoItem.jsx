import React from 'react'

export default function TodoItem({ title, description, isCompleted, updateHandler, deleteHandler, id}) {
  return (
    <div className='todo'>
      
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
        <input onChange={() => updateHandler(id)} type='checkbox' checked = {isCompleted} />
        <button className='btn' onClick={() => deleteHandler(id)}>Delete</button>
      </div>
    </div>
  )
}
