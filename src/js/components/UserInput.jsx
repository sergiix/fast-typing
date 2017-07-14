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
      input: 1,
      big: 1,
      action: 1,
      error: this.props.isError,
    })

    return (
      <div className="ui fluid">
        <div className="ui fluid grid">
          <div className="twelve wide column">
            <div className={classes}>
              {this.props.isTyping
                ? <input type="text" ref={::this.initInput} value="" autoFocus value={this.props.partValue} onChange={::this.onChange} />
                : <input type="text" disabled="disabled" ref="input" value={this.props.partValue} />
              }
              <a className="ui basic button" data-tooltip="Your statistics: CPM / Errors" data-position="bottom center">
                <UserInputStatus />
              </a>
            </div>
          </div>
          <div className="four wide column">
            <div className="ui big fluid buttons">
              <button className="ui button" onClick={::this.props.actions.startCountdownTimer} data-tooltip="Press for typing" data-position="bottom center">Start</button>
              <div className="or"></div>
              <button className="ui button" onClick={::this.props.actions.refreshText} data-tooltip="Refresh text" data-position="bottom center">
                <i className="refresh icon"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isError: state.typing.isError,
    partValue: state.typing.partValue,
    isTyping: state.typing.isTyping,
    isCompleted: state.typing.isCompleted,
    isCountdownTimerStarted: state.typing.countdownTimer.started,
    countdownTimerLeft: state.typing.countdownTimer.left
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
