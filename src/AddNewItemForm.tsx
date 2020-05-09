import React from 'react';
import PropTypes from 'prop-types';

type StateType = {
  error: boolean
  title: string
}
type OwnPropsType = {
  addItem: (text: string) => void
}

class AddNewItemForm extends React.Component<OwnPropsType, StateType> {
  state = {
    error: false,
    title: '',
  }

  onAddItemClick = () => {
    let newTitle = this.state.title
    if (!newTitle) {
      this.setState({error: true})
    } else {
      this.setState({error: false, title: ''})
      this.props.addItem(newTitle)
    }
  }

  onChangeTitle = (e:  React.ChangeEvent<HTMLInputElement>) => {
    this.setState({title: e.currentTarget.value, error: false})
  }

  onAddItemKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

