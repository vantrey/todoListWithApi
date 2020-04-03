import React from 'react';
import PropTypes from 'prop-types';

class AddNewItemForm extends React.Component {
  state = {
    error: false,
    title: '',
  }

  onAddItemClick = () => {
    debugger
    let newTitle = this.state.title
    if (!newTitle) {
      this.setState({error: true})
    } else {
      this.setState({error: false, title: ''})
      this.props.addItem(newTitle)
    }
  }

  onChangeTitle = (e) => {
    this.setState({title: e.currentTarget.value, error: false})
  }

  onAddItemKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.onAddItemClick()
    }
  }

  render = () => {
    let classError = this.state.error ? 'error' : ''
    return (
        <div className="todoList-newTaskForm">
          <input
            value={this.state.title}
            onKeyPress={this.onAddItemKeyPress}
            onChange={this.onChangeTitle}
            type="text"
            placeholder="New Item name"
            className={classError}
          />
          <button onClick={this.onAddItemClick}>Add</button>
        </div>
    )
  }
}

export default AddNewItemForm;

AddNewItemForm.propTypes = {
  onAddItemClick: PropTypes.func,
}
