
const ReadOnlyItem = ({ item, handleMarkCompleted })=> {
    return (
        <>
            <tr>
                <td>{item.title}</td>
                <td>{item.completed ? "completed":"Pending"}</td>
                <td> {!item.completed?<button onClick = {()=>{handleMarkCompleted(item)}}>Mark completed</button>:""} </td>
            </tr>
        </>
    )
}

export default ReadOnlyItem
