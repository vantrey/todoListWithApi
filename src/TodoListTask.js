import React from 'react';
import PropType from 'prop-types';

class TodoListTask extends React.Component {
  onIsDoneChanged = (e) => {
    this.props.changeStatus(this.props.task, e.currentTarget.checked)
  }
  render = () => {
    let classForTask = this.props.task.isDone ? 'todoList-task done': 'todoList-task'
    return (
      <div className={classForTask}>
        <input type={'checkbox'}
               checked={this.props.task.isDone}
               onChange={this.onIsDoneChanged}/>
        <span>{this.props.task.title} - priority: {this.props.task.priority}</span>
      </div>
    );
  }
}

export default TodoListTask;

TodoListTask.propTypes = {
  title: PropType.string,
  isDone: PropType.bool,
  priority: PropType.string,
}