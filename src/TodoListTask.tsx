import React from 'react';
import PropType from 'prop-types';
import Button from "./Button/Button"
import {TaskType} from "./types/entities";

type StateType = {
  editMode: boolean,
  title: string
}
type OwnPropType = {
  delTask: (taskId: string) => void
  changeTaskTitle: (task: TaskType, title: string) => void
  changeStatus: (task: TaskType, status: number) => void
  task: TaskType
}

class TodoListTask extends React.Component<OwnPropType, StateType> {
  state = {
    editMode: false,
    title: this.props.task.title
  }
  activateEditMode = () => {
    this.setState({editMode: true})
  }
  deactivateEditMod = () => {
    if (this.state.title) {
      this.props.changeTaskTitle(this.props.task, this.state.title)
      this.setState({editMode: false})
    }
  }
  onIsDoneChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    let status = e.currentTarget.checked ? 2 : 0
    this.props.changeStatus(this.props.task, status)
  }
  onTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({title: e.currentTarget.value})
  }

  transformPriority = (priority: number) => {
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
    let classForEditMode = this.state.title ? '' : 'error'
    return (
      <div className={classForTask}>
        <input type={'checkbox'}
               checked={this.props.task.status === 2}
               onChange={this.onIsDoneChanged}
               disabled={this.props.task.isStatusLoading}
        />
        {this.state.editMode
          ? <input className={classForEditMode}
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
