import { useState } from 'react'
import "./styles.css"

// a component can only return one element
// can use fragment (empty tag) <></> to have multiple elements in a component
export default function App() {
  const [newItem, setNewItem] = useState("")
  // calling function (ex setNewItem) rerenders component
  // setNewItem("") if you just had this here, it would be an endless loop because each time it is loading it will rerender
  const [todos, setTodos] = useState([])
  function handleSubmit(e){
    e.preventDefault()

    // passing in old values of todos using a function
    // set new item vs pass in function
    setTodos(currentTodos => { // on argument is current state
      return [ // return whatever you want new state to be
        ...currentTodos,
        { id: crypto.randomUUID(), title: newItem, completed: false},
      ]
    })

    setNewItem("") // to clear text entry after adding to todo list
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
      <form className="input-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">New Item</label>
          <input 
            value={newItem} 
            onChange={e => setNewItem(e.target.value)} // changes newItem (in the input) to whatever the e.target.value is each time e.target.value changes
            type="text" 
            id="item" 
          />
          {/* id and label links those together */}
        </div>
        <button className="btn">Add</button>
      </form>

      <h1 className="header">To Do List</h1>
      <ul className="list">
        {todos.length === 0 && "Nothing to do!"} {/* short circuiting*/}
        {todos.map(todoItem => { // map returns array of elements, must have unique id, dont use index because you may want to delete things
          return(
            <li key={todoItem.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todoItem.completed}
                  onChange={e => toggleTodo(todoItem.id, e.target.checked)}
                />
                {todoItem.title}
              </label>
              <button
                className="btn delete"
                onClick={() => deleteTodo(todoItem.id) } // need the function part ()=> vs pass in return value of function
              >
                Delete
              </button>
            </li>
          )
        })  }

      </ul>
    </>

  )
}
