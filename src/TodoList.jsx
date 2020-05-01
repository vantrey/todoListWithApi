import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle"
import {connect} from "react-redux"
import Button from "./Button/Button"
import {
  addTask,
  changeTask,
  delSelectedTasks,
  delTask,
  setLoading,
  getTasks, setTodoListTitle
} from "./reduser"
import {api} from "./api"

class TodoList extends React.Component {
  componentDidMount() {
    this.restoreState()
  }

  state = {
    filterValue: 'All'
  }

  restoreState = () => {
    this.props.getTasks(this.props.todoListId)
  }

  addTask = (newTitleText) => {
    this.props.addTask(newTitleText, this.props.todoListId)
  }
  changeFilter = (newFilterValue) => {
    this.setState({filterValue: newFilterValue}, () => {
    })
  }

  delSelectedTasks = () => {

    this.props.tasks.forEach((t) => {
      if (t.status === 2) {
        this.delTask(t.id)
      }
    })
    /*this.props.setLoading(true)
    let selectedTasksIds = this.props.tasks.map(t => {
      if (t.status === 2) return t.id
    })
    let delTasksFromServer = () => {
      return new Promise((resolve) => {
        let i = 0
        let stop = setInterval(() => {
          if (i < selectedTasksIds.length) {
            this.delTask(selectedTasksIds[i])
            console.log(selectedTasksIds[i])
            i++
          } else {
            clearInterval(stop)
            resolve()
          }
        }, 2000)
      })
    }
    delTasksFromServer().then(() => {
      this.props.setLoading(false)
    })*/
  }

  delTask = (taskId) => {
    this.props.delTask(this.props.todoListId, taskId)
  }
  changeStatus = (task, status) => {
    this.changeTask(task, {status: status})
  }
  changeTaskTitle = (task, title) => {
    this.changeTask(task, {title: title})
  }
  changeTask = (task, obj) => {
    this.props.changeTask({...task, ...obj})
  }

  setTodoListTitle = (newTitle) => {
    this.props.setTodoListTitle(this.props.todoListId, newTitle)
  }

  render = () => {
    let {tasks = []} = this.props
    return (
      <div className="App">
        <div className="todoList">
          <div className='todoListTitleWrap'>
            <TodoListTitle setTodoListTitle={this.setTodoListTitle} title={this.props.title}/>
            <div className="TodoListDelBtn">
              <Button id={this.props.todoListId} f={this.props.delTodoList} btnName={`X`}/>
            </div>
          </div>
          <AddNewItemForm addItem={this.addTask}/>
          <TodoListTasks
            delTask={this.delTask}
            changeTaskTitle={this.changeTaskTitle}
            changeStatus={this.changeStatus}
            tasks={tasks.filter(t => {
              if (this.state.filterValue === 'Active') {
                return t.status === 0
              } else if (this.state.filterValue === 'Completed') {
                return t.status === 2
              } else if (this.state.filterValue === 'All') {
                return true
              }
            })}/>
          <TodoListFooter
            delSelectedTasks={this.delSelectedTasks}
            changeFilter={this.changeFilter}
            filterValue={this.state.filterValue}
          />
        </div>
      </div>
    )
  }
}

export default connect(null, {
  addTask, changeTask, delTask, delSelectedTasks, getTasks, setLoading, setTodoListTitle
})(TodoList);

