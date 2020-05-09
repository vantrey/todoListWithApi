import React from 'react';

type StateType = {
  title: string
  editMode: boolean
}
type OwnPropsType = {
  setTodoListTitle: (newTitle: string) => void
  title: string
}

class TodoListTitle extends React.Component<OwnPropsType, StateType> {

  state = {
    title: this.props.title,
    editMode: false
  }

  onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({title: e.currentTarget.value})
  }
  deactivateEditMode = () => {
    this.props.setTodoListTitle(this.state.title)
    this.setState({editMode: false})
  }
  activateMode = () => {
    this.setState({editMode: true})
  }
  render = () => {
    return (
      <div className="todoList-header">
        {
          this.state.editMode
            ? <input
              value={this.state.title}
              onChange={this.onChangeTitle}
              onBlur={this.deactivateEditMode}
              autoFocus={true}
            />
            : <h3 onClick={this.activateMode} className="todoList-header__title">{this.props.title}</h3>
        }
      </div>
    )
  }
}

export default TodoListTitle;

/*AddNewItemForm.propTypes = {
  onAddTaskClick: PropTypes.func,
}*/
