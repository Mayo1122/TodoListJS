import { useContext } from 'react';
import { AddTodoContext } from '../contexts/contexts';

function AddTodo({ item, setItem }) {
  const handleAddTask = useContext(AddTodoContext);
  const handleTaskChange = (e) => {
    setItem(
      {
        ...item,
        title: e.target.value,
      },
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask(item);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Task:
        <input type="text" value={item.title} onChange={handleTaskChange} />
      </label>
      <input type="submit" value="Save" />
    </form>
  );
}

export default AddTodo;
