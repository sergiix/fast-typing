import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import rootReducer from '../reducers/index.reducer'
import dictionariesReducer from '../reducers/dictionaries.reducer'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

const initialState = {
  dictionaries: {
      isPending: false,
      isError: false,
      isSuccess: false,
      list: {},
      selectedDictionaryId: 0,
      selectedDictionaryTextId: 0
  },
  typing: {
    index: 0,
    text: [],
    fullValue: '',
    partValue: '',
    isError: false,
    isCompleted: false,
    isStarted: false,
    isTyping: false,
    isFinished: true,
    countErrors: 0,
    speed: 0,
    waitingText: '',
    countdownTimer: {
      started: false,
      ended: true,
      text: '',
      seconds: 6,
      left: 0
    }
  }
};

export default function configureStore(state = initialState) {
  const logger = createLogger();
  const reducer = combineReducers({
    typing: rootReducer,
    dictionaries: dictionariesReducer
  })

  if (__DEV__) {
    return createStore(
      reducer,
      state,
      compose(
        applyMiddleware(thunk, /*logger*/),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
    )
  }

  return createStore(reducer, state, compose(applyMiddleware(thunk)))
}
