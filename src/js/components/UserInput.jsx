import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classSet from 'react-classset'
import * as actions from '../actions'
import UserInputStatus from './UserInputStatus'

class UserInput extends React.Component {
  onChange(event) {
    this.props.actions.userInput(this.input.value);
  }
  initInput(el) {
    this.input = el;
    if (el)
      el.focus();
  }
  render() {
    let classes = classSet({
      ui: 1,
      fluid: 1,
      action: 0,
      input: 1,
      big: 1,
      error: this.props.isError
    })

    return (
      <div className={classes}>
        {this.props.isTyping
          ? <input type="text" ref={::this.initInput} value="" autoFocus value={this.props.partValue} onChange={::this.onChange} />
          : <input type="text" disabled="disabled" ref="input" value={this.props.waitingText} />
        }
        <div className="ui labeled button" tabindex="0">
          <button className="ui button" onClick={::this.props.actions.startCountdownTimer}>Start</button>
          <a className="ui left pointing label">
            <UserInputStatus />
          </a>
        </div>

      </div>
    )
    //<button className="ui basic button" onClick={::this.props.actions.startCountdownTimer}>Start</button>
  }
}

function mapStateToProps(state) {
  return {
    isError: state.typing.isError,
    partValue: state.typing.partValue,
    isTyping: state.typing.isTyping,
    isCountdownTimerStarted: state.typing.countdownTimer.started,
    countdownTimerLeft: state.typing.countdownTimer.left,
    waitingText: state.typing.countdownTimer.text
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
