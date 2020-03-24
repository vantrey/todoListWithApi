import React from 'react';
import './App.css';
import TodoList from "./TodoList"
import AddNewItemForm from "./AddNewItemForm"
import {repository} from "./repository"

class App extends React.Component {
  componentDidMount() {
    this.restoreState()
  }

  state = {
    todoLists: [
      {title: 'What to learn', id: 0},
    ]
  }

  saveState = () => {
    repository.saveTodoLists(this.state)
  }
  restoreState = () => {
    let state = repository.getTodoLists()
    if (state != null) this.setState(state)
  }

  addTodoList = (newTitleText) => {
    let lastIndex = this.state.todoLists.length - 1
    let newTodoList = {
      title: newTitleText,
      id: lastIndex + 1
    }
    let newTodoLists = [...this.state.todoLists, newTodoList]
    this.setState({todoLists: newTodoLists}, () => {
      this.saveState()
    })
  }

  render = () => {
    const todoLists = this.state.todoLists.map((tl, i) => <TodoList
      key={i}
      id={tl.id}
      title={tl.title}
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

export default App;

