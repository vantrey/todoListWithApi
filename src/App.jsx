import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
  state = {
    tasks: [
      {title: 'CSS', isDone: true, priority: 'low'},
      {title: 'JS', isDone: false, priority: 'medium'},
      {title: 'ReactJS', isDone: false, priority: 'high'},
      {title: 'Patterns', isDone: true, priority: 'low'}
    ],
    filterValue: 'All'
  }
  addTask = (newTitleText) => {
    let newTask = {
      title: newTitleText,
      isDone: false,
      priority: 'low'
    }
    let newTasks = [...this.state.tasks, newTask]
    this.setState({tasks: newTasks})
  }
  changeFilter = (newFilterValue) => {
    this.setState({filterValue: newFilterValue})
  }
  changeStatus = (task, isDone) => {
    let newTasks = this.state.tasks.map(t => {
      if (t === task) {
        return {...t, isDone: isDone}
      } else {
        return t
      }
    })
    this.setState({
      tasks: newTasks
    })
  }

  render = () => {
    return (
      <div className="App">
        <div className="todoList">
          <TodoListHeader addTask={this.addTask}/>
          <TodoListTasks changeStatus={this.changeStatus} tasks={this.state.tasks.filter(t => {
            if (this.state.filterValue === 'Active') {
          return !t.isDone
        } else if (this.state.filterValue === 'Completed') {
          return t.isDone
        } else if (this.state.filterValue === 'All') {
          return true
        }
          })}/>
          <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
        </div>
      </div>
    );
  }
}

export default App;

