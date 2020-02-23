import React from 'react';
import TodoListTask from "./TodoListTask";
import propTypes from 'prop-types'

class TodoListTasks extends React.Component {
  render = () => {
    let tasksElements = this.props.tasks.map((task, index) => {
      return (
        <TodoListTask
          key={index}
          title={task.title}
          isDone={task.isDone}
          priority={task.priority}
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