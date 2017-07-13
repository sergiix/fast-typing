import React, {Component} from 'react'
import {connect} from 'react-redux'
import StartCountdownTimerButton from './StartCountdownTimerButton'

class UserInputStatus extends Component {
  render () {
    return (
      <div>
        <span title="Characters per minute">{this.props.speed}</span>&nbsp;/&nbsp;<span title="Errors" className="ui red">{this.props.countErrors}</span>
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
