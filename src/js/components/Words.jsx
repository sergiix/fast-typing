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
              let className = '';
              if (i < wordIndex)
                className = 'word-typed';

              if (i == wordIndex)
                className = this.props.isError ? 'word-error' : 'word-current'

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
    wordIndex: state.typing.wordIndex,
    isError: state.typing.isError
  }
}

export default connect(mapStateToProps)(Words)
