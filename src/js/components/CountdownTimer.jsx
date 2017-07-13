import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions'

class CountdownTimer extends Component {
  componentDidMount() {
    this.start()
  }

  start() {
    if (this.props.shouldCountdownTimerStart)
      this.id = setInterval(::this.tick, 1000);
  }

  tick() {
    this.props.actions.countdownTimerTick()

    if (this.props.shouldCountdownTimerEnd)
      this.stop();
  }

  stop() {
    clearInterval(this.id);
  }

  render () {
    return (
      <div>{this.props.isCountdownTimerStarted ? this.props.left : ''}</div>
    )
  }
}

function mapStateToProps(state) {
  return {
    left: state.typing.countdownTimer.left,
    isCountdownTimerStarted: state.typing.countdownTimer.started
  }
}

function mapDisplatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}
export default connect(mapStateToProps, mapDisplatchToProps)(CountdownTimer)
