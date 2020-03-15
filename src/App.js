import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/v4';
import "./Todo.css";

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }


  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
    })
    todoNameRef.current.value = null 
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (

    <div className="App" >
        <div className="header">
          <h1>Beth's ToDo List</h1>
        </div>
      <form>
        <input ref={todoNameRef} type="text" placeholder="...Todo" />
          <button className="add-btn" onClick={handleAddTodo}>Add</button>
          <button className="clear-btn" onClick={handleClearTodos} >Delete</button>
          <div><TodoList todos={todos} toggleTodo={toggleTodo} /></div>
          <div>{todos.filter(todo => !todo.complete).length} Left to do</div>
      </form>
    </div>
  )
}

export default App;
