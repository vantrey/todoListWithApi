import {api} from "./api"
import {TodoType, TaskType} from "./types/entities"
import {Dispatch} from "redux";
import {AppStateType} from "./store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

const ADD_TODO_LIST_SUCCESS = 'TodoList/Reducer/ADD_TODO_LIST_SUCCESS'
const DEL_TODO_LIST_SUCCESS = 'TodoList/Reducer/DEL_TODO_LIST_SUCCESS'
const ADD_TASK_SUCCESS = 'TodoList/Reducer/ADD_TASK_SUCCESS'
const CHANGE_TASK_SUCCESS = 'TodoList/Reducer/CHANGE_TASK_SUCCESS'
const DEL_TASK_SUCCESS = 'TodoList/Reducer/DEL_TASK_SUCCESS'
const DEL_SELECTED_TASKS = 'TodoList/Reducer/DEL_SELECTED_TASKS'
const GET_TODO_LISTS_SUCCESS = 'TodoList/Reducer/GET_TODO_LISTS_SUCCESS' // setTodoList
const GET_TASKS_SUCCESS = 'TodoList/Reducer/GET_TASKS_SUCCESS' // setTask
const SET_TODO_LISTS_LOADING = 'TodoList/Reducer/SET_TODO_LISTS_LOADING'
const SET_TODO_LIST_TITLE_SUCCESS = 'TodoList/Reducer/SET_TODO_LIST_TITLE_SUCCESS'
const SET_TASKS_LOADING = 'TodoList/Reducer/SET_TASKS_LOADING'
const SET_IS_STATUS_LOADING = 'TodoList/Reducer/SET_IS_STATUS_LOADING'

type InitialStateType = {
  todoLists: Array<TodoType>
  isTodoListsLoading: boolean,
}

const initialState: InitialStateType = {
  todoLists: [],
  isTodoListsLoading: false,
}

const reducer = (state: InitialStateType = initialState, action: TodoActionTypes): InitialStateType => {
  switch (action.type) {
    case ADD_TODO_LIST_SUCCESS: {
      return {
        ...state,
        todoLists: [...state.todoLists, {...action.newTodoList, tasks: []}],
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
    case CHANGE_TASK_SUCCESS:
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
    case GET_TODO_LISTS_SUCCESS:
      return {
        ...state,
        todoLists: action.todoLists.map((todo) => {
          return {
            ...todo,
            tasks: [],

          }
        })
      }     //??

    case GET_TASKS_SUCCESS:
      return {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: action.tasks}
          } else return todo
        })
      }
    case SET_TODO_LISTS_LOADING:
      return {
        ...state,
        isTodoListsLoading: action.isLoading
      }
    case SET_TASKS_LOADING:
      return {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, isTasksLoading: action.isLoading}
          } else return todo
        })
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
    case SET_IS_STATUS_LOADING:
      return {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.task.todoListId) {
            return {
              ...todo, tasks: todo.tasks.map(t => {
                if (t.id === action.task.id) {
                  return {...t, isStatusLoading: action.isStatusLoading}
                } else return t
              })
            }
          } else return todo
        })
      }
    default:
      return state
  }
}

type TodoActionTypes = AddTodoListSuccessActionType | DelTodoListSuccessActionType | AddTaskSuccessActionType |
  ChangeTaskSuccessActionType | DelTaskSuccessActionType | GetTodoListsSuccessActionType |
  GetTasksSuccessActionType | SetTodoListTitleSuccessActionType | SetTodoListsLoadingActionType |
  SetTasksLoadingActionType | DelSelectedTasksActionType | SetIsStatusLoadingActionType

// action Creators
type AddTodoListSuccessActionType = {
  type: typeof ADD_TODO_LIST_SUCCESS // 'TodoList/Reducer/ADD_TODO_LIST_SUCCESS'
  newTodoList: TodoType
}
const addTodoListSuccess = (newTodoList: TodoType): AddTodoListSuccessActionType => ({
  type: ADD_TODO_LIST_SUCCESS,
  newTodoList
})

type DelTodoListSuccessActionType = {
  type: typeof DEL_TODO_LIST_SUCCESS
  todoListId: string
}
const delTodoListSuccess = (todoListId: string): DelTodoListSuccessActionType => ({
  type: DEL_TODO_LIST_SUCCESS,
  todoListId
})

type AddTaskSuccessActionType = {
  type: typeof ADD_TASK_SUCCESS
  newTask: TaskType
}
const addTaskSuccess = (newTask: TaskType): AddTaskSuccessActionType => ({type: ADD_TASK_SUCCESS, newTask})

type ChangeTaskSuccessActionType = {
  type: typeof CHANGE_TASK_SUCCESS
  task: TaskType
}
const changeTaskSuccess = (task: TaskType): ChangeTaskSuccessActionType => ({type: CHANGE_TASK_SUCCESS, task})

type DelTaskSuccessActionType = {
  type: typeof DEL_TASK_SUCCESS
  taskId: string
  todoListId: string
}
const delTaskSuccess = (taskId: string, todoListId: string): DelTaskSuccessActionType => ({
  type: DEL_TASK_SUCCESS,
  taskId,
  todoListId
})

type GetTodoListsSuccessActionType = {
  type: typeof GET_TODO_LISTS_SUCCESS
  todoLists: Array<TodoType>
}
const getTodoListsSuccess = (todoLists: Array<TodoType>): GetTodoListsSuccessActionType => ({
  type: GET_TODO_LISTS_SUCCESS,
  todoLists
})

type GetTasksSuccessActionType = {
  type: typeof GET_TASKS_SUCCESS
  tasks: Array<TaskType>
  todoListId: string
}
const getTasksSuccess = (tasks: Array<TaskType>, todoListId: string): GetTasksSuccessActionType => ({
  type: GET_TASKS_SUCCESS,
  tasks,
  todoListId
})

type SetTodoListTitleSuccessActionType = {
  type: typeof SET_TODO_LIST_TITLE_SUCCESS
  todoListId: string
  title: string
}
const setTodoListTitleSuccess = (todoListId: string, title: string): SetTodoListTitleSuccessActionType => ({
  type: SET_TODO_LIST_TITLE_SUCCESS,
  todoListId,
  title
})

type SetTodoListsLoadingActionType = {
  type: typeof SET_TODO_LISTS_LOADING
  isLoading: boolean
}
const setTodoListsLoading = (isLoading: boolean): SetTodoListsLoadingActionType => ({
  type: SET_TODO_LISTS_LOADING,
  isLoading
})

type SetTasksLoadingActionType = {
  type: typeof SET_TASKS_LOADING
  todoListId: string
  isLoading: boolean
}
const setTasksLoading = (todoListId: string, isLoading: boolean): SetTasksLoadingActionType => ({
  type: SET_TASKS_LOADING,
  todoListId,
  isLoading
})

export type DelSelectedTasksActionType = {
  type: typeof DEL_SELECTED_TASKS
  todoListId: string
}
export const delSelectedTasks = (todoListId: string): DelSelectedTasksActionType => ({
  type: DEL_SELECTED_TASKS,
  todoListId
})

type SetIsStatusLoadingActionType = {
  type: typeof SET_IS_STATUS_LOADING
  task: TaskType
  isStatusLoading: boolean
}
const setIsStatusLoading = (task: TaskType, isStatusLoading: boolean): SetIsStatusLoadingActionType => ({
  type: SET_IS_STATUS_LOADING,
  task,
  isStatusLoading
})

// thunks
// dispatch thunk without thunk inside
export const getTodoLists = () => (dispatch: Dispatch<TodoActionTypes>, getState: () => AppStateType) => {
  dispatch(setTodoListsLoading(true))
  api.getTodoLists()
    .then(res => {
      dispatch(getTodoListsSuccess(res.data))
      dispatch(setTodoListsLoading(false))
    })
}
// dispatch thunk if need thunk inside
type ThunkType = ThunkAction<void, AppStateType, unknown, TodoActionTypes>
type DispatchType = ThunkDispatch<AppStateType, unknown, TodoActionTypes>

export const addTodoList = (newTitleText: string): ThunkType =>
  (dispatch: DispatchType, getState: () => AppStateType) => {
    api.addTodoList(newTitleText)
      .then(res => {
        if (res.data.resultCode === 0) {
          let todoList = res.data.data.item
          console.log(res.data.data.item)
          dispatch(addTodoListSuccess(todoList))
        }
      })
  }
export const delTodoList = (todoListId: string): ThunkType =>
  (dispatch: DispatchType, getState: () => AppStateType) => {
    api.delTodoList(todoListId)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(delTodoListSuccess(todoListId))
        }
      })
  }
export const getTasks = (todoListId: string): ThunkType => (dispatch: DispatchType) => {
  dispatch(setTasksLoading(todoListId, true))
  api.getTasks(todoListId)
    .then(res => {
      dispatch(getTasksSuccess(res.data.items.map(t => ({...t})), todoListId)) //??
      dispatch(setTasksLoading(todoListId, false))
      console.log(res.data.items)
    })
}
export const addTask = (newTitleText: string, todoListId: string): ThunkType => (dispatch: DispatchType) => {
  api.createTask(newTitleText, todoListId)
    .then(res => {
      if (res.data.resultCode === 0) {
        let task = res.data.data.item
        dispatch(addTaskSuccess(task))
      }
    })
}
export const delTask = (todoListId: string, taskId: string): ThunkType => (dispatch: DispatchType) => {
  api.delTask(todoListId, taskId)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(delTaskSuccess(taskId, todoListId))
      }
    })
}
export const changeTask = (task: TaskType): ThunkType => (dispatch: DispatchType) => {
  dispatch(setIsStatusLoading(task, true))
  api.changeTask(task)
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(changeTaskSuccess(res.data.data.item))
        dispatch(setIsStatusLoading(task, false))
      }
    })
}
export const setTodoListTitle = (todoListId: string, newTitle: string) => (dispatch: DispatchType) => {
  api.setTodoListTitle(todoListId, newTitle)
    .then(
      response => {
        dispatch(setTodoListTitleSuccess(todoListId, newTitle))
      })
}

export default reducer