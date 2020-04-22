import axios from 'axios'

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
  headers: {"API-KEY": "bf825c9a-985b-4152-9f7d-ce82a9632e5e"}
});

export const api = {
  createTask(newTitleText, todoListId) {
    return instance.post(
      `/${todoListId}/tasks`,
      {title: newTitleText},
    )
  },
  getTodoLists() {
    return instance.get('')
  },
  addTodoList(newTitleText) {
    return instance.post('',
      {title: newTitleText},
    )
  },
  delTodoList(todoListId) {
    return instance.delete(
      `/${todoListId}`,
    )
  },
  getTasks(todoListId) {
    return instance.get(`/${todoListId}/tasks`)
  },
  delTask(todoListId, taskId) {
    debugger
    return instance.delete(
      `/${todoListId}/tasks/${taskId}`)
  },
  changeTask(task) {
    return instance.put(
      `/${task.todoListId}/tasks/${task.id}`,
      task
    )
  },
  setTodoListTitle(todoListId, newTitle) {
    return axios.put(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todoListId}`,
      {title: newTitle},
      {
        withCredentials: true,
        headers: {"API-KEY": "bf825c9a-985b-4152-9f7d-ce82a9632e5e"}
      }
    )
  }
}