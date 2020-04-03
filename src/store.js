import {createStore} from "redux"

const initialState = {
  todoLists: [
    {title: 'What to learn', id: 0, tasks: []},
  ],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO_LIST':
      return {
        ...state,
        todoLists: [...state.todoLists, action.newTodoList]
      }
    case 'DEL_TODO_LIST':
      return {
        ...state, todoLists: state.todoLists.filter(todo => {
          return action.todoListId !== todo.id
        })
      }
    case 'ADD_TASK':
      return {
        ...state, todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: [...todo.tasks, action.newTask]}
          } else {
            return todo
          }
        })
      }
    case 'CHANGE_TASK':
      return {
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
    case 'DEL_TASK':
      return {
        ...state,
        todoLists: state.todoLists.map(todo => {
          if (todo.id === action.todoListId) {
            return {...todo, tasks: todo.tasks.filter (t => action.taskId !== t.id)}
          } else return todo
        })
      }
  }
  return state
}

const store = createStore(reducer)
window.store = store
export default store