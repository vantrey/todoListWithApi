import React from 'react';
import './App.css';
import TodoList from "./TodoList"
import AddNewItemForm from "./AddNewItemForm"
import {connect} from "react-redux"
import {addTodoListAC, delTodoListAC, restoreStateAC} from "./reduser"

class App extends React.Component {
  componentDidMount() {
    this.props.restoreState()
  }

  addTodoList = (newTitleText) => {
    let newTodoList = {
      title: newTitleText,
      id: this.props.nextTodoListId,
      tasks: [],
      nextTaskId: 0,
    }
    this.props.addTodoList(newTodoList)
  }

  delTodoList = (todoListId) => {
    this.props.delTodoList(todoListId)
  }

  render = () => {
    const todoLists = this.props.todoLists.map((tl, i) => <TodoList
      key={i}
      nextTaskId={tl.nextTaskId}
      todoListId={tl.id}
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
    todoLists: state.todoLists,
    nextTodoListId: state.nextTodoListId
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addTodoList: (newTodoList) => {
      const action = addTodoListAC (newTodoList)
      dispatch(action)
    },
    delTodoList: (todoListId) => {
      dispatch(delTodoListAC(todoListId))
    },
    restoreState: () => {
      dispatch(restoreStateAC())
    }
  }
}
const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)
export default ConnectedApp


