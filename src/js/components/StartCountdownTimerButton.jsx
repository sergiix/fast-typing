import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as typingActions from '../actions'

class StartCountdownTimerButton extends Component {
  startCountdownTimer() {
    this.props.actions.startCountdownTimer()
  }
  render() {
    return (
      <div className="fluid">
      {!this.props.started
        ? <button className="ui black basic button fluid" onClick={::this.startCountdownTimer}>Start</button>
        : ''
      }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    started: state.typing.countdownTimer.started
  }
}

function mapDisplatchToProps(dispatch) {
  return {
    actions: bindActionCreators(typingActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDisplatchToProps)(StartCountdownTimerButton)
