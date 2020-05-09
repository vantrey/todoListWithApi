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
  getTasks, setTodoListTitle, DelSelectedTasksActionType
} from "./reduser"
import {TaskType} from "./types/entities";
import {AppStateType} from "./store";

type StateType = {
  filterValue: string
}
type OwnPropsType = {
  todoListId: string
  title: string
  tasks: Array<TaskType>
  isTasksLoading: boolean
  delTodoList: (todoListId: string) => void
}
type MapDispatchPropsType = {
  addTask: (newTitleText: string, todoListId: string) => void
  changeTask: (task: TaskType) => void
  delTask: (todoListId: string, taskId: string) => void
  delSelectedTasks: (todoListId: string) => void //??
  getTasks: (todoListId: string) => void
  setTodoListTitle: (todoListId: string, newTitle: string) => void
}
type PropsType = OwnPropsType & MapDispatchPropsType

class TodoList extends React.Component<PropsType, StateType> {
  componentDidMount() {
    this.restoreState()
  }

  state = {
    filterValue: 'All'
  }

  restoreState = () => {
    this.props.getTasks(this.props.todoListId)
  }

  addTask = (newTitleText: string) => {
    this.props.addTask(newTitleText, this.props.todoListId)
  }
  changeFilter = (newFilterValue: string) => {
    this.setState({filterValue: newFilterValue}, () => {
    })
  }

  delSelectedTasks = () => {
    this.props.tasks.forEach((t) => {
      if (t.status === 2) {
        this.delTask(t.id)
      }
    })
  }

  delTask = (taskId: string) => {
    this.props.delTask(this.props.todoListId, taskId)
  }
  changeStatus = (task: TaskType, status: number) => {
    this.changeTask(task, {status: status})
  }
  changeTaskTitle = (task: TaskType, title: string) => {
    this.changeTask(task, {title: title})
  }
  changeTask = (task: TaskType, obj: {status?: number, title?: string}) => {
    this.props.changeTask({...task, ...obj})
  }

  setTodoListTitle = (newTitle: string) => {
    this.props.setTodoListTitle(this.props.todoListId, newTitle)
  }

  render = () => {
    //let {tasks = []} = this.props
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
          {
            this.props.isTasksLoading ? <span>...Loading</span> :
              <TodoListTasks
                delTask={this.delTask}
                changeTaskTitle={this.changeTaskTitle}
                changeStatus={this.changeStatus}
                tasks={this.props.tasks.filter(t => {
                  if (this.state.filterValue === 'Active') {
                    return t.status === 0
                  } else if (this.state.filterValue === 'Completed') {
                    return t.status === 2
                  } else if (this.state.filterValue === 'All') {
                    return true
                  }
                })}/>
          }
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

export default connect<{}, MapDispatchPropsType, OwnPropsType, AppStateType>(null, {
  addTask, changeTask, delTask, delSelectedTasks, getTasks, setTodoListTitle
})(TodoList);

