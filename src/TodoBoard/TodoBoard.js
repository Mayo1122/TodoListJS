import { useCallback, useEffect, useState } from 'react';
import ReadOnlyItem from '../TodoItemRow/ReadOnlyItem';
import AddTodo from '../AddTodo/AddTodo';
import { getTodoList, postTodoItem, updateTodoItem } from '../utils/services/TodoCrud';
import { TODO_EMPTY_ITEM } from '../utils/constants';
import { MarkCompletedContext, AddTodoContext } from '../contexts/contexts';

function TodoBoard() {
  const [todoItems, setTodoItems] = useState([]);
  const [item, setItem] = useState(TODO_EMPTY_ITEM);

  const fetchTodosList = () => {
    getTodoList()
      .then((res) => {
        setTodoItems(res);
      })
      .catch(() => {
        alert('error while fetching the list');
      });
  };

  useEffect(() => {
    fetchTodosList();
  }, []);

  const handleMarkCompleted = useCallback((currItem) => {
    updateTodoItem({ ...currItem, completed: true })
      .then(() => {
      })
      .catch(() => {

      });
  }, []);

  // eslint-disable-next-line max-len
  const uiRows = todoItems.map((todo) => <ReadOnlyItem key={todo.id} item={todo} />);

  const handleAddTask = useCallback(
    (newTask) => {
      postTodoItem(newTask).then((data) => {
        setTodoItems([...todoItems, data]);
        setItem(TODO_EMPTY_ITEM);
      }).catch(() => {
        alert('unable to add todo, try again');
      });
    },
    [todoItems],
  );

  return (
    <>
      <h1> TODO App</h1>
      <p> Add, update, see your daily todos</p>
      <AddTodoContext.Provider value={handleAddTask}>
        <AddTodo item={item} setItem={setItem} />
      </AddTodoContext.Provider>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <MarkCompletedContext.Provider value={handleMarkCompleted}>
            {uiRows}
          </MarkCompletedContext.Provider>
        </tbody>
      </table>
    </>
  );
}

export default TodoBoard;
