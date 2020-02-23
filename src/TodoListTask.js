import React from 'react';
import PropType from 'prop-types';

class TodoListTask extends React.Component {
  render = () => {
    return (
      <div className="todoList-task">
        <input type={'checkbox'} checked={this.props.isDone}/>
        <span>{this.props.title} - priority: {this.props.priority}</span>
      </div>
    );
  }
}

export default TodoListTask;

TodoListTask.propTypes={
  title: PropType.string,
  isDone: PropType.bool,
  priority: PropType.string,
}