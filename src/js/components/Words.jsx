import React, {Component} from 'react'
import {connect} from 'react-redux'

class Words extends Component {
  render() {
    return (
      <div>
        {this.props.text}
      </div>
    )
  }
}

function mapStateToProps(state) {
  console.log(state.dictionaries)
  return {
    text: state.dictionaries.list[state.dictionaries.selectedDictionaryId][state.dictionaries.selectedDictionaryTextId],
  }
}

export default connect(mapStateToProps)(Words)
