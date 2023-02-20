import axios from 'axios';
import { BASE_URL } from '../constants';

const getTodoList = () => new Promise((resolve, reject) => {
  axios.get(BASE_URL)
    .then((res) => {
      resolve(res.data.slice(0, 3));
    })
    .catch((reason) => {
      reject(reason);
    });
});

const postTodoItem = (newTask) => new Promise((resolve, reject) => {
  axios.post(BASE_URL, newTask)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

const updateTodoItem = (item) => new Promise((resolve, reject) => {
  axios.put(BASE_URL, item)
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err);
    });
});

export { getTodoList, postTodoItem, updateTodoItem };
