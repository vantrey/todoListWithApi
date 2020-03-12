import React from 'react';
import TodoListTask from "./TodoListTask";
import propTypes from 'prop-types'

class TodoListTasks extends React.Component {
  render = () => {
    let tasksElements = this.props.tasks.map((t, i) => {
      return (
        <TodoListTask
          changeTaskTitle={this.props.changeTaskTitle}
          task={t}
          key={i}
          /*title={task.title}
          isDone={task.isDone}
          priority={task.priority}*/
          changeStatus={this.props.changeStatus}
        />
      )
    });
    return (
      <div className="todoList-tasks">
        {tasksElements}
      </div>
    );
  }
}

export default TodoListTasks;
TodoListTasks.propTypes = {
  tasks: propTypes.arrayOf(propTypes.object)
}