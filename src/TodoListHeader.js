import React from 'react';
import PropTypes from 'prop-types';

class TodoListHeader extends React.Component {
  state = {
    error: false,
    title: '',
  }

  onAddTaskClick = () => {
    let newTitle = this.state.title
    if (!newTitle) {
      this.setState({error: true})
    } else {
      this.setState({error: false, title: ''})
      this.props.addTask(newTitle)
    }
  }

  onChangeTitle = (e) => {
    this.setState({title: e.currentTarget.value, error: false})
  }

  onAddTaskKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onAddTaskClick()
    }
  }

  render = () => {
    let classError = this.state.error ? 'error' : ''
    return (
      <div className="todoList-header">
        <h3 className="todoList-header__title">What to Learn</h3>
        <div className="todoList-newTaskForm">
          <input
            value={this.state.title}
            onKeyPress={this.onAddTaskKeyPress}
            onChange={this.onChangeTitle}
            type="text"
            placeholder="New task name"
            className={classError}
          />
          <button onClick={this.onAddTaskClick}>Add</button>
        </div>
      </div>
    );
  }
}

export default TodoListHeader;

TodoListHeader.propTypes = {
  onAddTaskClick: PropTypes.func,
}
