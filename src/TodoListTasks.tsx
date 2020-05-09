import React from 'react';
import TodoListTask from "./TodoListTask";
import propTypes from 'prop-types'
import {TaskType} from "./types/entities";

type OwnPropsType = {
  delTask: (taskId: string) => void
  changeTaskTitle: (task: TaskType, title: string) => void
  changeStatus: (task: TaskType, status: number) => void
  tasks: Array<TaskType>
}

class TodoListTasks extends React.Component<OwnPropsType> {
  render = () => {
    let tasksElements = this.props.tasks.map((t, i) => {
      return (
        <TodoListTask
          delTask={this.props.delTask}
          changeTaskTitle={this.props.changeTaskTitle}
          task={t}
          key={t.id}
          changeStatus={this.props.changeStatus}
        />
      )
    });
    return (
      <div className="todoList-tasks">
        {tasksElements}
      </div>
    )
  }
}

export default TodoListTasks
