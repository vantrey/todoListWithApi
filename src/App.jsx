import React from 'react';
import './App.css';
import TodoList from "./TodoList"
import AddNewItemForm from "./AddNewItemForm"
import {connect} from "react-redux"
import {addTodoList, delTodoList, setTodoLists} from "./reduser"
import axios from 'axios'
import Loading from "./Loading/Loading"

class App extends React.Component {
  componentDidMount() {
    this.restoreState()
  }

  restoreState() {
    let pr = axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
    pr.then(res => {
      this.props.setTodoLists(res.data)
    })
  }

  addTodoList = (newTitleText) => {
    axios.post(
      'https://social-network.samuraijs.com/api/1.1/todo-lists',
      {title: newTitleText},
      {
        withCredentials: true,
        headers: {'API-KEY': 'bf825c9a-985b-4152-9f7d-ce82a9632e5e'}
      }
    ).then(res => {
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
    axios.delete(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoListId}`,
      {
        withCredentials: true,
        headers: {'API-KEY': 'bf825c9a-985b-4152-9f7d-ce82a9632e5e'}
      }
    )
      .then(res => {
        if (res.data.resultCode === 0) {
          this.props.delTodoList(todoListId)
        }
      })
  }

  render = () => {
    const todoLists = this.props.todoLists.map((tl, i) => <TodoList
      key={i}
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


