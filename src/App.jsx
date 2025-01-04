import { useEffect, useState } from 'react'
import "./styles.css"
import { NewTodoForm } from './NewTodoForm'
import { TodoList } from './TodoList'

// a component can only return one element
// can use fragment (empty tag) <></> to have multiple elements in a component
export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {
    // takes function as argument, doesnt return anything
    // react hooks can't be inside anything
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos]) // run function every time arguments in this array change

  // props let you pass information to custom components
  function addTodo(title) {
    // passing in old values of todos using a function
    // set new item vs pass in function
    setTodos(currentTodos => { // on argument is current state
      return [ // return whatever you want new state to be
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false},
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>{
      return currentTodos.map(todo => { // loop through all todos stored
        if (todo.id === id){ // if the todo id matches the checkbox id, set todo.completed in the todos array to the current condition of the checkbox
          return { ...todo, completed } // to change state need to create new state object (immutable)
        }
        return todo // if not at right todo, just return without changes
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>

      <NewTodoForm onSubmit={addTodo}/> {/* prop on newtodo form called onsubmit and we are giving it this data */}

      <h1 className="header">To Do List</h1>

      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>

  )
}
