import {useEffect, useState} from "react";
import ReadOnlyItem from "../TodoItemRow/ReadOnlyItem";
import AddTodo from "../AddTodo/AddTodo";
import {getTodoList, postTodoItem, updateTodoItem} from "../utils/services/TodoCrud";

const TodoBoard = () =>{
    const [todoItems, setTodoItems] = useState([]);
    const [item, setItem] = useState({title:"", completed:false})

    useEffect(()=>{
        fetchTodosList();
    },[])

    const fetchTodosList = () => {
        getTodoList()
            .then((res) =>{
                setTodoItems(res);
            })
            .catch((err)=>{
                alert("error while fetching the list");
            })
    }

    const handleMarkCompleted = (item) =>{
        updateTodoItem({...item,completed:true})
            .then((data)=>{
            })
            .catch((err)=>{

            })
    }

    const uiRows = todoItems.map(item =>{
        return <ReadOnlyItem key = {item.id} item={item} handleMarkCompleted = {handleMarkCompleted} />
    })

    const handleAddTask = (newTask) =>{
        postTodoItem(newTask).then((data)=>{
            setTodoItems([...todoItems, data])
            setItem({title:"", completed:false})
        }).catch((err)=>{
            alert("unable to add todo, try again");
        })
    }

    return (
        <>
            <h1> TODO App</h1>
            <p> Add, update, see your daily todos</p>
            <AddTodo item = {item} setItem={setItem} handleAddTask = {handleAddTask}/>
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

export default TodoBoard
