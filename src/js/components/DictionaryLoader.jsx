import React, {Component} from 'react'
import {connect} from 'react-redux'
import Loader from './Loader'

class DictionaryLoader extends Component {
  render() {
    if (this.props.isPending)
      return <Loader />
  }
}

function mapStateToProps(state) {
  return {
    isPending: state.dictionaries.isPending,
    isLoaded: state.dictionaries.isLoaded
  }
}

export default connect(mapStateToProps)(DictionaryLoader)
