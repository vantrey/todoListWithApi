import React from 'react';
import './App.css';
import TodoList from "./TodoList"
import AddNewItemForm from "./AddNewItemForm"
import {connect} from "react-redux"
import {addTodoList, delTodoList, getTodoLists} from "./reduser"
import Loading from "./Loading/Loading"
import {TodoType} from "./types/entities";
import {AppStateType} from "./store";

type MapStatePropsType = {
  todoLists: Array<TodoType>,
  isTodoListsLoading: boolean
}
type MapDispatchPropsType = {
  addTodoList: (newTitleText: string) => void
  delTodoList: (todoListId: string) => void
  getTodoLists: () => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class App extends React.Component<PropsType> {
  componentDidMount() {
    this.restoreState()
  }

  restoreState() {
    this.props.getTodoLists()
  }

  addTodoList = (newTitleText: string) => {
    this.props.addTodoList(newTitleText)
  }

  delTodoList = (todoListId: string) => {
    this.props.delTodoList(todoListId)
  }

  render = () => {
    const todoLists = this.props.todoLists.map((tl, i) => <TodoList
      key={tl.id}
      todoListId={tl.id}
      title={tl.title}
      tasks={tl.tasks}
      isTasksLoading={tl.isTasksLoading}
      delTodoList={this.delTodoList}
    />)
    return (
      <div>
        <div>
          <AddNewItemForm addItem={this.addTodoList}/>
        </div>
        <div className="App">
          {(this.props.isTodoListsLoading && <Loading/>) || todoLists}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    todoLists: state.todoListApp.todoLists,
    isTodoListsLoading: state.todoListApp.isTodoListsLoading
  }
}

const ConnectedApp = connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addTodoList, delTodoList, getTodoLists
})(App)
export default ConnectedApp


