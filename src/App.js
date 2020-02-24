import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.newTaskTitleRef = React.createRef();
  }

  state = {
    tasks: [
      {title: 'CSS', isDone: true, priority: 'low'},
      {title: 'JS', isDone: false, priority: 'medium'},
      {title: 'ReactJS', isDone: false, priority: 'high'},
      {title: 'Patterns', isDone: true, priority: 'low'}
    ],
    filterValue: 'Completed'
  }

  onAddTaskClick = () => {
    let newText = this.newTaskTitleRef.current.value;
    let newTask = {
      title: newText,
      isDone: false,
      priority: 'low'
    }
    /*let newTasks=this.state.tasks.push(newTask) */
    let newTasks = [...this.state.tasks, newTask]
    this.setState({tasks: newTasks})
    this.newTaskTitleRef.current.value = ''
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
          <TodoListHeader onAddTaskClick={this.onAddTaskClick} refTitleTask={this.newTaskTitleRef}/>
          <TodoListTasks changeStatus={this.changeStatus} tasks={this.state.tasks.filter(task => {
            if (this.state.filterValue === 'Active') {
              return task.isDone === false
            } else if (this.state.filterValue === 'Completed') {
              return task.isDone === true
            } else {
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

