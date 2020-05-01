import {api} from "./api"

const ADD_TODO_LIST_SUCCESS = 'TodoList/Reducer/ADD_TODO_LIST_SUCCESS'
const DEL_TODO_LIST_SUCCESS = 'TodoList/Reducer/DEL_TODO_LIST_SUCCESS'
const ADD_TASK_SUCCESS = 'TodoList/Reducer/ADD_TASK_SUCCESS'
const CHANGE_TASK_SUCCESS = 'TodoList/Reducer/CHANGE_TASK_SUCCESS'
const DEL_TASK_SUCCESS = 'TodoList/Reducer/DEL_TASK_SUCCESS'
const DEL_SELECTED_TASKS = 'TodoList/Reducer/DEL_SELECTED_TASKS'
const RESTORE_STATE = 'TodoList/Reducer/RESTORE_STATE'
const GET_TODO_LISTS_SUCCESS = 'TodoList/Reducer/GET_TODO_LISTS_SUCCESS' // setTodoList
const GET_TASKS_SUCCESS = 'TodoList/Reducer/GET_TASKS_SUCCESS' // setTask
const SET_LOADING = 'TodoList/Reducer/SET_LOADING'
const SET_TODO_LIST_TITLE_SUCCESS = 'TodoList/Reducer/SET_TODO_LIST_TITLE_SUCCESS'

const initialState = {
  todoLists: [],
  isLoading: false,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO_LIST_SUCCESS: {
      return {
        ...state,
        todoLists: [...state.todoLists, action.newTodoList],
      }
    }
    case DEL_TODO_LIST_SUCCESS: {
      return {
        ...state, todoLists: state.todoLists.filter(todo => {
          return action.todoListId !== todo.id
        })
      }
    }
    case ADD_TASK_SUCCESS: {
      return {
        ...state, todoLists: state.todoLists.map(todo => {
          if (todo.id === action.newTask.todoListId) {
            return {...todo, tasks: [...todo.tasks, action.newTask]}
          } else {
            return todo
          }
        })
      }
    }
    case CHANGE_TASK_SUCCESS: {
      return {
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
    }
    case DEL_TASK_SUCCESS: {
      return {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: todo.tasks.filter(t => action.taskId !== t.id)}
          } else return todo
        })
      }
    }
    case DEL_SELECTED_TASKS: {
      return {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: todo.tasks.filter(t => t.status === 0)}
          } else return todo
        })
      }
    }
    case GET_TODO_LISTS_SUCCESS: {
      return {
        ...state,
        todoLists: action.todoLists.map(todo => ({...todo, tasks: []}))
      }
    }
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: action.tasks}
          } else return todo
        })
      }
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case SET_TODO_LIST_TITLE_SUCCESS:
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

const addTodoListSuccess = (newTodoList) => ({type: ADD_TODO_LIST_SUCCESS, newTodoList})
const delTodoListSuccess = (todoListId) => ({type: DEL_TODO_LIST_SUCCESS, todoListId})
const addTaskSuccess = (newTask) => ({type: ADD_TASK_SUCCESS, newTask})
const changeTaskSuccess = (task) => ({type: CHANGE_TASK_SUCCESS, task})
const delTaskSuccess = (taskId, todoListId) => ({type: DEL_TASK_SUCCESS, taskId, todoListId})
export const delSelectedTasks = (todoListId) => ({type: DEL_SELECTED_TASKS, todoListId})
const getTodoListsSuccess = (todoLists) => ({type: GET_TODO_LISTS_SUCCESS, todoLists})
const getTasksSuccess = (tasks, todoListId) => ({type: GET_TASKS_SUCCESS, tasks, todoListId})
export const setLoading = (isLoading) => ({type: SET_LOADING, isLoading})
const setTodoListTitleSuccess = (todoListId, title) => (
  {type: SET_TODO_LIST_TITLE_SUCCESS, todoListId, title}
)

export const getTodoLists = () => (dispatch, getState) => {
  api.getTodoLists()
    .then(res => {
      dispatch(getTodoListsSuccess(res.data))
    })
}
export const addTodoList = (newTitleText) => (dispatch, getState) => {
  api.addTodoList(newTitleText)
    .then(res => {
      if (res.data.resultCode === 0) {
        let todoList = res.data.data.item
        dispatch(addTodoListSuccess(todoList))
      }
    })
}
export const delTodoList = (todoListId) => (dispatch, getState) => {
  api.delTodoList(todoListId)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(delTodoListSuccess(todoListId))
      }
    })
}
export const getTasks = (todoListId) => (dispatch, getState) => {
  api.getTasks(todoListId)
    .then(res => {
      dispatch(getTasksSuccess(res.data.items, todoListId))
    })
}
export const addTask = (newTitleText, todoListId) => (dispatch, getState) => {
  api.createTask(newTitleText, todoListId)
    .then(res => {
      if (res.data.resultCode === 0) {
        let task = res.data.data.item
        dispatch(addTaskSuccess(task))
      }
    })
}
export const delTask = (todoListId, taskId) => (dispatch, getState) => {
  api.delTask(todoListId, taskId)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(delTaskSuccess(taskId, todoListId))
      }
    })
}
export const changeTask = (task) => (dispatch, getState) => {
  api.changeTask(task)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(changeTaskSuccess(res.data.data.item))
      }
    })
}
export const setTodoListTitle = (todoListId, newTitle) => (dispatch) => {
  api.setTodoListTitle(todoListId, newTitle)
    .then(
      response => {
        console.log(response)
        dispatch(setTodoListTitleSuccess(todoListId, newTitle))
      })
}

export default reducer