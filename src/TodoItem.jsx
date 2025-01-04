export function TodoItem ({ completed, id, title, toggleTodo, deleteTodo }) {
    return(
    <li>
        <label>
        <input
            type="checkbox"
            checked={completed}
            onChange={e => toggleTodo(id, e.target.checked)}
        />
        {title}
        </label>
        <button
        className="btn delete"
        onClick={() => deleteTodo(id) } // need the function part ()=> vs pass in return value of function
        >
        Delete
        </button>
    </li>
    )
}