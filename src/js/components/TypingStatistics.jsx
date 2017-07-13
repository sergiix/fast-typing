import React, {Component} from 'react'
import {connect} from 'react-redux'

class TypingStatistics extends Component {
  render () {
    return (
      <div className="ui mini horizontal statistic"></div>
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

export default connect(mapStateToProps)(TypingStatistics)
