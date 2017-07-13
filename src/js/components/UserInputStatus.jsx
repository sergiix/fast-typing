import React, {Component} from 'react'
import {connect} from 'react-redux'
import StartCountdownTimerButton from './StartCountdownTimerButton'

class UserInputStatus extends Component {
  render () {
    return (
      <div>
        <div>
          <a className="ui fluid blue label">
            Speed: {this.props.speed}
          </a>
        </div>
        <br />
        <div>
          <a className="ui fluid blue label">
            Errors: {this.props.countErrors}
          </a>
        </div>
        <br />
        <div>
          <StartCountdownTimerButton />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    countErrors: state.typing.countErrors,
    isCompleted: state.typing.isCompleted,
    speed: state.typing.speed
  }
}

export default connect(mapStateToProps)(UserInputStatus)
