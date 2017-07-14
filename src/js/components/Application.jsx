import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import UserInput from './UserInput'
import Text from './Text'
import Words from './Words'
import UserInputStatus from './UserInputStatus'
import TypingStatistics from './TypingStatistics'
import * as actions from '../actions'
import CountdownTimer from './CountdownTimer'
import DictionaryLoader from './DictionaryLoader'
import Chart from './Chart'

class Application extends Component {

  startCountdownTimer() {
    this.props.actions.startCountdownTimer()
  }

  render () {
    if (this.props.isDictionaryPending)
      return <DictionaryLoader />

    return (
      <div className="ui container">
        <div className="ui grid">
          <div className="row">
            <div className="right floated right aligned three wide column">
              <i className="github icon"></i> <a href="https://github.com/sergiix/fast-typing" target="_blank">Source code</a>
            </div>
          </div>
          <div className="row">
            <div className="wide column">
              <div className="ui ignored big message">
                <Words />
              </div>
              <UserInput />
    				</div>
          </div>
          <div className="row">
            <div className="wide column">
              <Chart />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isCountdownTimerStarted: state.typing.countdownTimer.started,
    isCountdownTimerEnded: state.typing.countdownTimer.ended,
    isCompleted: state.typing.isCompleted,
    isStarted: state.typing.isStarted,
    isTyping: state.typing.isTyping,
    isDictionaryPending: state.dictionaries.isPending
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Application)
