import React from 'react';

class TodoListTitle extends React.Component {

  state = {
    title: this.props.title,
    editMode: false
  }

  onChangeTitle = (e) => {
    this.setState({title: e.target.value})
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
