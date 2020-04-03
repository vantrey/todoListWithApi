import React from 'react';
import './App.css';
import TodoList from "./TodoList"
import AddNewItemForm from "./AddNewItemForm"
import {repository} from "./repository"
import {connect} from "react-redux"

class App extends React.Component {
  componentDidMount() {
    this.restoreState()
  }

  /*  state = {
      todoLists: [
        {title: 'What to learn', id: 0},
      ]
    }*/

  saveState = () => {
    repository.saveTodoLists(this.state)
  }
  restoreState = () => {
    let state = repository.getTodoLists()
    if (state != null) this.setState(state)
  }

  addTodoList = (newTitleText) => {
    let nextIndex
    this.props.todoLists.length > 0 ?
      nextIndex = this.props.todoLists.length :
      nextIndex = 0
    let newTodoList = {
      title: newTitleText,
      id: nextIndex,
      tasks: []
    }

    /*let newTodoLists = [...this.props.todoLists, newTodoList]*/
    /*this.setState({todoLists: newTodoLists}, () => {
      this.saveState()
    })*/
    this.props.addTodoList(newTodoList)
  }
  delTodoList = (todoListId) => {
    this.props.delTodoList (todoListId)
  }

  render = () => {
    const todoLists = this.props.todoLists.map((tl, i) => <TodoList
      key={i}
      id={tl.id}
      title={tl.title}
      tasks={tl.tasks}
      delTodoList={this.props.delTodoList}
    />)
    return (
      <div>
        <div>
          <AddNewItemForm addItem={this.addTodoList}/>
        </div>
        <div className="App">
          {todoLists}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todoLists: state.todoLists
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTodoList: (newTodoList) => {
      const action = {
        type: 'ADD_TODO_LIST',
        newTodoList: newTodoList,
      }
      dispatch(action)
    },
    delTodoList: (todoListId) => {
      const action = {
        type: 'DEL_TODO_LIST',
        todoListId:todoListId,
      }
      dispatch(action)
    }
  }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp


