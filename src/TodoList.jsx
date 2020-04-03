import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle"
import {connect} from "react-redux"

class TodoList extends React.Component {
/*  componentDidMount() {
    this.restoreState()
  }*/

  state = {
    tasks: [],
    filterValue: 'All'
  }

  saveState = () => {
    let stareAsString = JSON.stringify(this.state)
    localStorage.setItem('our-state-' + this.props.id, stareAsString)
  }
  restoreState = () => {
    let state = {
      tasks: [],
      filterValue: 'All'
    }
    let stateAsString = localStorage.getItem('our-state-' + this.props.id)
    if (stateAsString != null) {
      state = JSON.parse(stateAsString)
      state.tasks.forEach(t => {
        if (t.id >= this.nextTaskId) {
          this.nextTaskId = t.id + 1
        }
      })
    }
    this.setState(state, () => {
      this.saveState()
    })
  }
  nextTaskId = 0

  addTask = (newTitleText) => {
    let newTask = {
      id: this.nextTaskId,
      title: newTitleText,
      isDone: false,
      priority: 'low'
    }
    this.nextTaskId++
    /*let newTasks = [...this.state.tasks, newTask]*/
    this.props.addTask(newTask, this.props.id)
    /*this.setState({tasks: newTasks}, () => {
      this.saveState()
    })*/
  }
  changeFilter = (newFilterValue) => {
    this.setState({filterValue: newFilterValue}, () => {
      this.saveState()
    })
  }
  delTask = () => {
    let newTasks = this.state.tasks.filter(t => !t.isDone)
    this.setState({tasks: newTasks}, () => {
      this.saveState()
    })
  }
  changeStatus = (taskId, isDone) => {
    this.changeTask(taskId, {isDone: isDone})
  }
  changeTaskTitle = (taskId, title) => {
    this.changeTask(taskId, {title: title})
  }
  changeTask = (taskId, obj) => {
    /*let newTask = this.props.tasks.map(t => {
      if (t.id === taskId) {
        return {...t, ...obj}
      } else {
        return t
      }
    })*/
    this.props.changeTask(taskId, obj, this.props.id)
    /*this.setState({tasks: newTask}, () => {
      this.saveState()
    })*/
  }

  render = () => {
    return (
      <div className="App">
        <div className="todoList">
          <TodoListTitle title={this.props.title}/>
          <AddNewItemForm addItem={this.addTask}/>
          <TodoListTasks
            changeTaskTitle={this.changeTaskTitle}
            changeStatus={this.changeStatus}
            tasks={this.props.tasks.filter(t => {
              if (this.state.filterValue === 'Active') {
                return !t.isDone
              } else if (this.state.filterValue === 'Completed') {
                return t.isDone
              } else if (this.state.filterValue === 'All') {
                return true
              }
            })}/>
          <TodoListFooter
            delTask={this.delTask}
            changeFilter={this.changeFilter}
            filterValue={this.state.filterValue}
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTask: (newTask, todoListId) => {
      const action = {
        type: 'ADD_TASK',
        newTask: newTask,
        todoListId: todoListId
      }
      dispatch(action)
    },
    changeTask: (taskId, obj, todoListId) => {
      const action = {
        type: 'CHANGE_TASK',
        taskId: taskId,
        obj: obj,
        todoListId: todoListId
      }
      dispatch(action)
    }
  }
}
export default connect(null, mapDispatchToProps)(TodoList);

