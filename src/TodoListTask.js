import React from 'react';
import PropType from 'prop-types';

class TodoListTask extends React.Component {
  state = {
    editMode: false,
  }
  activateEditMode = () => {
    this.setState({editMode: true})
  }
  deactivateEditMod = () => {
    this.setState({editMode: false})
  }
  onIsDoneChanged = (e) => {
    this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
  }
  onTitleChanged = (e) => {
    this.props.changeTaskTitle(this.props.task.id, e.currentTarget.value)
  }
  render = () => {
    let classForTask = this.props.task.isDone ? 'todoList-task done' : 'todoList-task'
    return (
      <div className={classForTask}>
        <input type={'checkbox'}
               checked={this.props.task.isDone}
               onChange={this.onIsDoneChanged}/>
        {this.state.editMode
          ? <input
            autoFocus={true}
            value={this.props.task.title}
            onBlur={this.deactivateEditMod}
            onChange={this.onTitleChanged}
          />
          : < span onClick={this.activateEditMode}>
        {this.props.task.id} - {this.props.task.title} - priority: {this.props.task.priority}
          </span>}
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