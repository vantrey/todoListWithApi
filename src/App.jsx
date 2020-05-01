import React from 'react';
import './App.css';
import TodoList from "./TodoList"
import AddNewItemForm from "./AddNewItemForm"
import {connect} from "react-redux"
import {addTodoList, delTodoList, getTodoLists} from "./reduser"
import Loading from "./Loading/Loading"

class App extends React.Component {
  componentDidMount() {
    this.restoreState()
  }

  restoreState() {
    this.props.getTodoLists()
  }

  addTodoList = (newTitleText) => {
   this.props.addTodoList(newTitleText)
  }

  delTodoList = (todoListId) => {
    this.props.delTodoList(todoListId)
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
    todoLists: state.todoListApp.todoLists,
    isLoading: state.todoListApp.isLoading
  }
}

const ConnectedApp = connect(mapStateToProps, {
  addTodoList, delTodoList, getTodoLists
})(App)
export default ConnectedApp


