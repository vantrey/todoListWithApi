import React from 'react';
import './App.css';
import TodoList from "./TodoList"
import AddNewItemForm from "./AddNewItemForm"
import {connect} from "react-redux"
import {addTodoList, delTodoList, setTodoLists} from "./reduser"
import axios from 'axios'
import Loading from "./Loading/Loading"
import {api} from "./api"

class App extends React.Component {
  componentDidMount() {
    this.restoreState()
  }

  restoreState() {
    api.getTodoLists()
      .then(res => {
        this.props.setTodoLists(res.data)
      })
  }

  addTodoList = (newTitleText) => {
    api.addTodoList(newTitleText)
      .then(res => {
        if (res.data.resultCode === 0) {
          let todoList = res.data.data.item
          this.props.addTodoList(todoList)
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  delTodoList = (todoListId) => {
    api.delTodoList(todoListId)
      .then(res => {
        if (res.data.resultCode === 0) {
          this.props.delTodoList(todoListId)
        }
      })
  }

  render = () => {
    const todoLists = this.props.todoLists.map((tl, i) => <TodoList
      key={tl.id}
      todoListId={tl.id}
      title={tl.title}
      tasks={tl.tasks}
      delTodoList={this.delTodoList}
    />)
    return (
      <div>
        <div>
          <AddNewItemForm addItem={this.addTodoList}/>
        </div>
        <div className="App">
          {(this.props.isLoading && <Loading/>) || todoLists}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todoLists: state.todoLists,
    isLoading: state.isLoading
  }
}

const ConnectedApp = connect(mapStateToProps, {
  addTodoList, delTodoList, setTodoLists
})(App)
export default ConnectedApp


