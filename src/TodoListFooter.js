import React from 'react';
import propTypes from 'prop-types';

class TodoListFooter extends React.Component {
  render = () => {

    let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
    let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
    let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";
    return (
      <div className="todoList-footer">
        <button className={classForAll}>All</button>
        <button className={classForCompleted}>Completed</button>
        <button className={classForActive}>Active</button>
      </div>
    );
  }
}

export default TodoListFooter;

TodoListFooter.propTypes = {
  filterValue: propTypes.string
}