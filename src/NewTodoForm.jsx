import { useState } from 'react'

export function NewTodoForm(props) {
    const [newItem, setNewItem] = useState("")
    // calling function (ex setNewItem) rerenders component
    // setNewItem("") if you just had this here, it would be an endless loop because each time it is loading it will rerender

    function handleSubmit(e){
        e.preventDefault()
        if (newItem === "") return

        props.onSubmit(newItem)
    
        setNewItem("") // to clear text entry after adding to todo list
      }

    return (
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
    )
}