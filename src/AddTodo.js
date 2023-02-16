import {useState} from "react";

export default function AddTodo({handleAddTask}) {
    const [item, setItem] = useState({title:"", completed:false});

    const handleTaskChange = (e)=> {
        console.log(e);
        setItem(
            {
                ...item,
                title : e.target.value
            }
        )
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        handleAddTask(item);
    }
    return(
        <>
            <form onSubmit= {handleSubmit}>
                <label>
                    Task:
                    <input type = "text" value = {item.title} onChange = {handleTaskChange}/>
                </label>
                <input type="submit" value="Save"/>
            </form>
        </>
    )
}