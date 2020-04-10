import {repository} from "./repository"

const ADD_TODO_LIST = 'TodoList/Reducer/ADD_TODO_LIST'
const DEL_TODO_LIST = 'TodoList/Reducer/DEL_TODO_LIST'
const ADD_TASK = 'TodoList/Reducer/ADD_TASK'
const CHANGE_TASK = 'TodoList/Reducer/CHANGE_TASK'
const DEL_TASK = 'TodoList/Reducer/DEL_TASK'
const DEL_SELECTED_TASK = 'TodoList/Reducer/DEL_SELECTED_TASK'
const RESTORE_STATE = 'TodoList/Reducer/RESTORE_STATE'

const initialState = {
  todoLists: [
    {title: 'What to learn', id: 0, tasks: [], nextTaskId: 0,},
  ],
  nextTodoListId: 1,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_LIST: {
      let newState = {
        ...state,
        todoLists: [...state.todoLists, action.newTodoList],
        nextTodoListId: state.nextTodoListId + 1
      }
      repository.saveTodoLists(newState)
      return newState
    }
    case DEL_TODO_LIST: {
      let newState = {
        ...state, todoLists: state.todoLists.filter(todo => {
          return action.todoListId !== todo.id
        })
      }
      repository.saveTodoLists(newState)
      return newState
    }
    case ADD_TASK: {
      let newState = {
        ...state, todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: [...todo.tasks, action.newTask], nextTaskId: todo.nextTaskId + 1}
          } else {
            return todo
          }
        })
      }
      repository.saveTodoLists(newState)
      return newState
    }
    case CHANGE_TASK: {
      let newState = {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {
              ...todo, tasks: todo.tasks.map(t => {
                if (t.id === action.taskId) {
                  return {...t, ...action.obj}
                } else return t
              })
            }
          } else return todo
        })
      }
      repository.saveTodoLists(newState)
      return newState
    }
    case DEL_TASK: {
      let newState = {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: todo.tasks.filter(t => action.taskId !== t.id)}
          } else return todo
        })
      }
      repository.saveTodoLists(newState)
      return newState
    }
    case DEL_SELECTED_TASK: {
      let newState = {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: todo.tasks.filter(t => !t.isDone)}
          } else return todo
        })
      }
      repository.saveTodoLists(newState)
      return newState
    }
    case RESTORE_STATE: {
      let restoredState = repository.getTodoLists()
      if (restoredState != null) {
        return restoredState
      } else return state
    }
  }
  return state
}

export const addTodoListAC = (newTodoList) => ({
  type: ADD_TODO_LIST,
  newTodoList, // newTodoList: newTodoList
})
export const delTodoListAC = (todoListId) => ({
  type: DEL_TODO_LIST,
  todoListId, // todoListId: todoListId
})
export const restoreStateAC = () => ({
  type: RESTORE_STATE,
})

export const addTaskAC = (newTask, todoListId) => ({
  type: ADD_TASK,
  newTask,
  todoListId
})
export const changeTaskAC = (taskId, obj, todoListId) => ({
  type: CHANGE_TASK,
  taskId,
  obj,
  todoListId
})
export const delTaskAC = (taskId, todoListId) => ({
  type: DEL_TASK,
  taskId,
  todoListId
})
export const delSelectedTaskAC = (todoListId) => ({
  type: DEL_SELECTED_TASK,
  todoListId
})

export default reducer