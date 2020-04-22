import {repository} from "./repository"

const ADD_TODO_LIST = 'TodoList/Reducer/ADD_TODO_LIST'
const DEL_TODO_LIST = 'TodoList/Reducer/DEL_TODO_LIST'
const ADD_TASK = 'TodoList/Reducer/ADD_TASK'
const CHANGE_TASK = 'TodoList/Reducer/CHANGE_TASK'
const DEL_TASK = 'TodoList/Reducer/DEL_TASK'
const DEL_SELECTED_TASKS = 'TodoList/Reducer/DEL_SELECTED_TASKS'
const RESTORE_STATE = 'TodoList/Reducer/RESTORE_STATE'
const SET_TUDO_LISTS = 'TodoList/Reducer/SET_TUDO_LISTS'
const SET_TASKS = 'TodoList/Reducer/SET_TASKS'
const SET_LOADING = 'TodoList/Reducer/SET_LOADING'
const SET_TODO_LIST_TITLE = 'TodoList/Reducer/SET_TODO_LIST_TITLE'

const initialState = {
  todoLists: [],
  isLoading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_LIST: {
      let newState = {
        ...state,
        todoLists: [...state.todoLists, action.newTodoList],
      }
      // repository.saveTodoLists(newState)
      return newState
    }
    case DEL_TODO_LIST: {
      let newState = {
        ...state, todoLists: state.todoLists.filter(todo => {
          return action.todoListId !== todo.id
        })
      }
      // repository.saveTodoLists(newState)
      return newState
    }
    case ADD_TASK: {
      let newState = {
        ...state, todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: [...todo.tasks, action.newTask]}
          } else {
            return todo
          }
        })
      }
      // repository.saveTodoLists(newState)
      return newState
    }
    case CHANGE_TASK: {
      let newState = {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.task.todoListId) {
            return {
              ...todo, tasks: todo.tasks.map(t => {
                if (t.id === action.task.id) {
                  return action.task
                } else return t
              })
            }
          } else return todo
        })
      }
      // repository.saveTodoLists(newState)
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
      // repository.saveTodoLists(newState)
      return newState
    }
    case DEL_SELECTED_TASKS: {
      let newState = {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: todo.tasks.filter(t => t.status === 0)}
          } else return todo
        })
      }
      // repository.saveTodoLists(newState)
      return newState
    }
    /*case RESTORE_STATE: {
      let restoredState = repository.getTodoLists()
      if (restoredState != null) {
        return restoredState
      } else return state
    }*/
    case SET_TUDO_LISTS: {
      return {
        ...state,
        todoLists: action.todoLists.map(todo => ({...todo, tasks: []}))
      }
    }
    case SET_TASKS:
      return {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return { ...todo, tasks: action.tasks}
          } else return todo
        })
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_TODO_LIST_TITLE:
      return {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, title: action.title}
          } else return todo
        })
      }
    default:
      return state
  }
}

export const addTodoList = (newTodoList) => ({type: ADD_TODO_LIST, newTodoList})
export const delTodoList = (todoListId) => ({type: DEL_TODO_LIST, todoListId})
// export const restoreState = () => ({type: RESTORE_STATE})

export const addTask = (newTask, todoListId) => ({type: ADD_TASK, newTask, todoListId})
export const changeTask = (task) => ({type: CHANGE_TASK, task})
export const delTask = (taskId, todoListId) => ({type: DEL_TASK, taskId, todoListId})
export const delSelectedTasks = (todoListId) => ({type: DEL_SELECTED_TASKS, todoListId})
export const setTodoLists = (todoLists) => ({type: SET_TUDO_LISTS, todoLists})
export const setTasks = (tasks, todoListId) => ({type: SET_TASKS, tasks, todoListId})
export const setLoading = (isLoading) => ({type: SET_LOADING, isLoading})
export const setTodoListTitle = (todoListId, title) => ({type: SET_TODO_LIST_TITLE, todoListId, title})

export default reducer