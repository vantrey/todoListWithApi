import React from 'react';
import PropType from 'prop-types';
import Button from "./Button/Button"

class TodoListTask extends React.Component {
  state = {
    editMode: false,
    title: ''
  }
  activateEditMode = () => {
    this.setState({editMode: true})
  }
  deactivateEditMod = () => {
    this.props.changeTaskTitle(this.props.task, this.state.title)
    this.setState({editMode: false, title: ''})
  }
  onIsDoneChanged = (e) => {
    let status = e.currentTarget.checked ? 2 : 0
    this.props.changeStatus(this.props.task, status)
  }
  onTitleChanged = (e) => {
    this.setState({title: e.currentTarget.value})
  }

  transformPriority = (priority) => {
    switch (priority) {
      case 0:
        return 'low'
      case 1:
        return 'middle'
      case 2:
        return 'high'
      case 3:
        return 'urgently'
      case 4:
        return 'late'
    }
  }

  render = () => {
    let classForTask = this.props.task.status === 2 ? 'todoList-task done' : 'todoList-task'
    return (
      <div className={classForTask}>
        <input type={'checkbox'}
               checked={this.props.task.status === 2}
               onChange={this.onIsDoneChanged}/>
        {this.state.editMode
          ? <input
            autoFocus={true}
            value={this.state.title}
            onBlur={this.deactivateEditMod}
            onChange={this.onTitleChanged}
          />
          : <span onClick={this.activateEditMode}>
        {/*{this.props.task.id}*/} - {this.props.task.title} -
            priority: {this.transformPriority(this.props.task.priority)}
          </span>}
        <div className='taskDelBtn'>
          <Button id={this.props.task.id} f={this.props.delTask} btnName={`X`}/>
        </div>
      </div>
    )
  }
}

export default TodoListTask;

TodoListTask.propTypes = {
  title: PropType.string,
  isDone: PropType.bool,
  priority: PropType.string,
}