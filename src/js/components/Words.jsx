import React, {Component} from 'react'
import {connect} from 'react-redux'

class Words extends Component {
  render() {
    let wordIndex = this.props.wordIndex;

    return (
      <div>
        {
          this.props.text
            .split(' ')
            .map((word, i) => {
              let className = i < wordIndex ? 'word-typed' : i == wordIndex ? 'word-current' : '';

              return [<span className={className}>{word}</span>, ' ']
            })
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    text: state.dictionaries.list[state.dictionaries.selectedDictionaryId][state.dictionaries.selectedDictionaryTextId],
    wordIndex: state.typing.wordIndex
  }
}

export default connect(mapStateToProps)(Words)
