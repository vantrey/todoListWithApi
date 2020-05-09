import React from 'react';
import styles from './Button.module.css'
import {string} from "prop-types"

type OwnPropsType = {
  id: string
  f: (f: string) => void
  btnName: string
}

class Button extends React.Component<OwnPropsType> {

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







