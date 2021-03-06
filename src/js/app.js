import '../css/app.scss'
import '../css/semantic/semantic.min.css'

import React from 'react'
import ReactDOM from 'react-dom'
import Application from './components/Application'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import * as actions from 'actions'

const store = configureStore()

store.dispatch(actions.loadDictionaries())
store.dispatch(actions.loadHistory())

ReactDOM.render(
	<Provider store={store}>
		<Application />
	</Provider>,
	document.getElementById('app')
);
