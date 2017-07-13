import React from 'react';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import classSet from 'react-classset'
import * as actions from '../actions'

class UserInput extends React.Component {
  onChange(event) {
    this.props.actions.userInput(this.refs.input.value);
  }
  componentDidMount() {
    this.refs.input.focus()
  }
  render() {
    let classes = classSet({
      ui: 1,
      fluid: 1,
      action: 1,
      input: 1,
      big: 1,
      error: this.props.isError
    })

    return (
      <div className={classes}>
        <input type="text" disabled={this.props.isTyping ? 'true' : 'false'} ref="input" value={this.props.partValue} onChange={::this.onChange} />
        <button className="ui basic button" onClick={::this.props.actions.startCountdownTimer}>Start</button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isError: state.typing.isError,
    partValue: state.typing.partValue,
    isTyping: state.typing.isTyping
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInput);
