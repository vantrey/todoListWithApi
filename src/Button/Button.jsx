import React from 'react';
import styles from './Button.module.css'

class Button extends React.Component {

  onClick = () => {
    this.props.f(this.props.id)
  }
  render = () => {
    return (
      <div>
        <button
          className={styles.button}
          onClick={this.onClick}
        >
          {this.props.btnName}
        </button>
      </div>
    )
  }
}

export default Button;







