import React from 'react';
import PropTypes from 'prop-types';

class TodoListHeader extends React.Component {
  constructor(props) {
    super(props);
    this.refTitleTask = React.createRef()
  }

  onAddTaskClick = () => {
    let newTitle = this.refTitleTask.current.value
    this.refTitleTask.current.value = ''
    this.props.addTask(newTitle)
  }

  render = () => {
    return (
      <div className="todoList-header">
        <h3 className="todoList-header__title">What to Learn</h3>
        <div className="todoList-newTaskForm">
          <input ref={this.refTitleTask} type="text" placeholder="New task name"/>
          <button onClick={this.onAddTaskClick}>Add</button>
        </div>
      </div>
    );
  }
}

export default TodoListHeader;

TodoListHeader.propTypes = {
  refTitleTask: PropTypes.object,
  onAddTaskClick: PropTypes.func,
}
