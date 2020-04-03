import {createStore} from "redux"
import {repository} from "./repository"

const initialState = {
  todoLists: [
    {title: 'What to learn', id: 0, tasks: []},
  ],
  nextTodoListId: 0,
  nextTaskId: 0,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO_LIST': {
      let newState = {
        ...state,
        todoLists: [...state.todoLists, action.newTodoList],
        nextTodoListId: state.nextTodoListId +1
      }
      repository.saveTodoLists(newState)
      return newState
    }
    case 'DEL_TODO_LIST': {
      let newState = {
        ...state, todoLists: state.todoLists.filter(todo => {
          return action.todoListId !== todo.id
        })
      }
      repository.saveTodoLists(newState)
      return newState
    }
    case 'ADD_TASK': {
      let newState = {
        ...state, todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: [...todo.tasks, action.newTask]}
          } else {
            return todo
          }
        })
      }
      repository.saveTodoLists(newState)
      return newState
    }
    case 'CHANGE_TASK': {
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
    case 'DEL_TASK': {
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
    case 'DEL_SELECTED_TASK': {
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
    case 'RESTORE_STATE': {
      let restoredState = repository.getTodoLists()
      if (restoredState != null) {
        return restoredState
      } else return state
    }
  }
  return state
}

const store = createStore(reducer)
window.store = store
export default store