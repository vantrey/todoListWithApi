import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import TodoListTitle from "./TodoListTitle"
import {connect} from "react-redux"
import Button from "./Button/Button"
import axios from 'axios'
import {
  addTask,
  changeTask,
  delSelectedTask,
  delTask,
  setLoading,
  setTasks
} from "./reduser"

class TodoList extends React.Component {
  componentDidMount() {
    this.restoreState()
  }

  state = {
    filterValue: 'All'
  }

  restoreState = () => {
    axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.todoListId}/tasks`,
      {
        withCredentials: true,
        headers: {'API-KEY': 'bf825c9a-985b-4152-9f7d-ce82a9632e5e'}
      })
      .then(res => {
        this.props.setTasks(res.data.items, this.props.todoListId)
      })
  }

  addTask = (newTitleText) => {
    axios.post(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.todoListId}/tasks`,
      {title: newTitleText},
      {
        withCredentials: true,
        headers: {'API-KEY': 'bf825c9a-985b-4152-9f7d-ce82a9632e5e'}
      }
    )
      .then(res => {
        if (res.data.resultCode === 0) {
          let task = res.data.data.item
          this.props.addTask(task, this.props.todoListId)
        }
      })
  }
  changeFilter = (newFilterValue) => {
    this.setState({filterValue: newFilterValue}, () => {
    })
  }
  delSelectedTask = () => {
    this.props.setLoading(true)
    let delTasksFromServer = (id) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.delTask(id)
          resolve()
        }, 2000)
      })
    }
    this.props.tasks.forEach(t => {
      if (t.status === 2) {
        delTasksFromServer(t.id).then(() => this.props.setLoading(false))
      }
    })
  }

  delTask = (taskId) => {
    axios.delete(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.todoListId}/tasks/${taskId}`,
      {
        withCredentials: true,
        headers: {'API-KEY': 'bf825c9a-985b-4152-9f7d-ce82a9632e5e'}
      }
    ).then(res => {
      if (res.data.resultCode === 0) {
        this.props.delTask(taskId, this.props.todoListId)
      }
    })
      .catch((error) => console.log(error))
  }
  changeStatus = (task, status) => {
    this.changeTask(task, {status: status})
  }
  changeTaskTitle = (task, title) => {
    this.changeTask(task, {title: title})
  }
  changeTask = (task, obj) => {
    axios.put(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.todoListId}/tasks/${task.id}`,
      {...task, ...obj},
      {
        withCredentials: true,
        headers: {'API-KEY': 'bf825c9a-985b-4152-9f7d-ce82a9632e5e'}
      }
    )
      .then(res => {
        if (res.data.resultCode === 0) {
          this.props.changeTask(res.data.data.item, this.props.todoListId)
        }
      })
  }

  render = () => {
    let {tasks = []} = this.props
    return (
      <div className="App">
        <div className="todoList">
          <div className='todoListTitleWrap'>
            <TodoListTitle title={this.props.title}/>
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
            delSelectedTask={this.delSelectedTask}
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

export default connect(null, {
  addTask, changeTask, delTask, delSelectedTask, setTasks, setLoading
})(TodoList);

