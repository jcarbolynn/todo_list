import { TodoItem } from './TodoItem'

export function TodoList({ todos, toggleTodo, deleteTodo }) {
    return (
        <ul className="list">
        {todos.length === 0 && "Nothing to do!"} {/* short circuiting*/}
        {todos.map(todoItem => { // map returns array of elements, must have unique id, dont use index because you may want to delete things
          return(
            <TodoItem {...todoItem} key={todoItem.id} toggleTodo={toggleTodo} deleteTodo={deleteTodo} /> // can pass in information like this
            // <TodoItem title={todoItem.title} id={todoItem.id} completed={todoItem.completed} key={todoItem.id}/> // need a key because rendering in an array
          )
        })  }

      </ul>
    )
}