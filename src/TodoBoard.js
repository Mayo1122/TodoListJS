import {useEffect, useState} from "react";
import axios from "axios";
import ReadOnlyItem from "./ReadOnlyItem";
import AddTodo from "./AddTodo";

const URL = "https://jsonplaceholder.typicode.com/todos"
export default function TodoBoard() {
    const [todoItems, setTodoItems] = useState([]);

    useEffect(()=>{
        fetchTodosList();
    },[])

    const fetchTodosList = () => {
        axios.get(URL)
            .then((res)=>{
                setTodoItems(res.data.slice(0,3));
            })
    }

    const handleMarkCompleted = (item) =>{
        axios.put(URL,{...item,completed:true})
            .then((res) =>{
                console.log(res.data)
                // setTodoItems(
                //   [
                //     ...todoItems,
                //     res.data
                //   ]
                // )
            })
    }

    const uiRows = todoItems.map(item =>{
        return <ReadOnlyItem item={item} handleMarkCompleted = {handleMarkCompleted} />
    })

    const handleAddTask = (newTask) =>{
        axios.post(URL,newTask)
            .then((res) =>{
                setTodoItems([...todoItems, res.data])
            })
    }

    return (
        <>
            <h1> TODO App</h1>
            <p> Add, update, see your daily todos</p>
            <AddTodo handleAddTask = {handleAddTask}/>
            <table>
                <thead>
                <tr>
                    <th>Task</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {uiRows}
                </tbody>
            </table>
        </>
    )
}