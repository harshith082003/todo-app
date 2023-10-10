import React, { useState, useEffect } from 'react'
import '../styles/app.scss'
import { Context, server } from '../main';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import TodoItem from '../components/TodoItem';

export default function Home() {

  const[tasks, setTasks] = useState([]);
  const[title, setTitle] = useState('');
  const[description, setDescription] = useState('');
  const[loading, setLoading] = useState(false);


  const createTask = async(e) => {
    e.preventDefault();
    setLoading(true);

    console.log(title, description);

    try{
      setLoading(true);
      const { data } = await axios.post(`${server}/tasks/new`, { 
      title, 
      description
      },{
      headers:{
          "Content-Type": "application/json"
      },
      withCredentials: true,
      })

      toast.success(data.message);
      // setIsAuthenticated(true);
      setLoading(false);
      setTitle('');
      setDescription('');

    } catch(error){
        toast.error(error.response.data.message);
        console.log(error);
        // setIsAuthenticated(false);
        setLoading(false);
    }
  }

  useEffect(() => {
    axios
      .get(`${server}/tasks/all`, {
        withCredentials: true,
      })
      .then(res => {
        setTasks(res.data.tasks)     
      })
      .catch(err => {
        // setIsAuthenticated(false);
        console.log(err);
      })
  }, []);

  return (
    <div className='container'>
      <div className='login'>
        <section >
          <form onSubmit={createTask}>
            <input 
                type='text' 
                value = {title} 
                onChange={e => setTitle(e.target.value)}
                placeholder='Enter Title' 
                required
            />
            
            <input 
                type='text' 
                value = {description} 
                onChange={e => setDescription(e.target.value)}
                placeholder='Enter Description' 
                required
            />
            
            <button disabled = {loading} type='submit'>Add Task</button>
          </form>
        </section>

        
      </div>

      <section className="todosContainer">
          {
            tasks.map(task => (
              <TodoItem title = {task.title} description={task.description} isCompleted={task.isCompleted}/>
            ))
          }
        </section>
      
    </div>
  )
}
