import React, {Component} from 'react'
import {connect} from 'react-redux'

class Text extends Component {
  render() {
    return (
      <div>
        {this.props.text}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    text: state.dictionaries[state.typing.selectedDictionaryIndex][state.typing.selectedDictionaryTextIndex]
  }
}

export default connect(mapStateToProps)(Text)
