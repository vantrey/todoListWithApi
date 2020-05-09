import axios from 'axios'
import {string} from "prop-types";
import {TaskType, TodoType} from "./types/entities";

const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
  withCredentials: true,
  headers: {"API-KEY": "bf825c9a-985b-4152-9f7d-ce82a9632e5e"}
});

type CommonResponseType<T> = {
  resultCode: number
  message: Array<string>
  data: T
}
/*type TasksResponseType = {
  items: Array<TaskType>
}*/

export const api = {
  createTask(newTitleText: string, todoListId: string) {
    return instance.post<CommonResponseType<{ item: TaskType }>>(
      `/${todoListId}/tasks`,
      {title: newTitleText},
    )
  },
  getTodoLists() {
    return instance.get<Array<TodoType>>('')
  },
  addTodoList(newTitleText: string) {
    return instance.post<CommonResponseType<{ item: TodoType }>>('',
      {title: newTitleText},
    )
  },
  delTodoList(todoListId: string) {
    return instance.delete<CommonResponseType<{}>>(
      `/${todoListId}`,
    )
  },
  getTasks(todoListId: string) {
    return instance.get<{ items: Array<TaskType> }>(`/${todoListId}/tasks`)
  },
  delTask(todoListId: string, taskId: string) {
    return instance.delete<CommonResponseType<{}>>(
      `/${todoListId}/tasks/${taskId}`)
  },
  changeTask(task: TaskType) {
    return instance.put<CommonResponseType<{ item: TaskType }>>(
      `/${task.todoListId}/tasks/${task.id}`,
      task
    )
  },
  setTodoListTitle(todoListId: string, newTitle: string) {
    return axios.put(`https://social-network.samuraijs.com/api/1.0/todo-lists/${todoListId}`,
      {title: newTitle},
      {
        withCredentials: true,
        headers: {"API-KEY": "bf825c9a-985b-4152-9f7d-ce82a9632e5e"}
      }
    )
  }
}