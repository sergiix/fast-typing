import {
  GENERATE_DICTIONARY_TEXT_INDEX,
  INIT_DICTIONARY_TEXT,
  START_COUNTDOWN_TIMER,
  COUNTDOWN_TIMER_TICK,
  COUNTDOWN_TIMER_ENDED,
  LOAD_DICTIONARIES_PENDING,
  LOAD_DICTIONARIES_SUCCESS,
  LOAD_DISTIONARIES_ERROR,
  RANDOM_DICTIONARY,
  START_TYPING,
  UPDATE_TEXT,
  COMPARE_TEXT,
  FINISH_TYPING
} from './constants'
import 'whatwg-fetch'

let countdownTimerIntervalId = 0

export function generateRandomText() {
  return { type: GENERATE_DICTIONARY_TEXT_INDEX }
}

export function initDictionaryText(text) {
  return { type: INIT_DICTIONARY_TEXT, payload: text }
}

export function updateText(text) {
  return {
    type: UPDATE_TEXT,
    payload: text
  }
}

export function userInput(text) {
  return dispatch => {
    dispatch(updateText(text))
    dispatch(compareText())
  }
}

export function compareText() {
  return { type: COMPARE_TEXT }
}

export function startCountdownTimer() {
  return (dispatch, getState) => {
    let prevId = getState().typing.countdownTimer.id

    if (prevId)
      clearInterval(prevId)

    let id = setInterval(() => {
      getState().typing.countdownTimer.left === 1
        ? dispatch(countdownTimerEnd())
        : dispatch(countdownTimerTick())
    }, 1000);

    dispatch({ type: START_COUNTDOWN_TIMER, payload: id });
    dispatch(countdownTimerTick())
  }
}

export function startTyping() {
  return { type: START_TYPING }
}

export function finishTyping() {
  return { type: FINISH_TYPING }
}

export function countdownTimerTick() {
  return { type: COUNTDOWN_TIMER_TICK }
}

export function countdownTimerEnd() {
  return (dispatch, getState) => {
    clearInterval(getState().typing.countdownTimer.id)

    dispatch({ type: COUNTDOWN_TIMER_ENDED })
    dispatch(startTyping())
  }
}

export function loadDictionaries() {
  return (dispatch, getState) => {
  	dispatch(pendingDictionaries())

  	fetch('dictionaries.json')
		.then ( res => res.json())
    .then ( data => {
        dispatch(loadDictionarySuccess(data))
        dispatch(randomDictionary())
        dispatch(initDictionaryText(getState().dictionaries.text))
      })
  		.catch( err => {
        dispatch(loadDictionaryError(err.message))
        throw err;
      })
  }
}

export function pendingDictionaries() {
	return {
		type: LOAD_DICTIONARIES_PENDING
	}
}

export function loadDictionarySuccess(data) {
  return {type: LOAD_DICTIONARIES_SUCCESS, payload: data }
}

export function loadDictionaryError(message) {
  return {
    type: LOAD_DISTIONARIES_ERROR,
    payload: message
  }
}

export function randomDictionary() {
  return {
    type: RANDOM_DICTIONARY
  }
}