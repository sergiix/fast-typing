import {
  GENERATE_DICTIONARY_TEXT_INDEX,
  INIT_DICTIONARY_TEXT,
  UPDATE_TEXT,
  COMPARE_TEXT,
  START_COUNTDOWN_TIMER,
  LOAD_DICTIONARIES_PENDING,
  LOAD_DICTIONARIES_SUCCESS,
  LOAD_DISTIONARIES_ERROR,
  RANDOM_DICTIONARY
} from '../constants'
import 'whatwg-fetch'

export function generateRandomText() {
  return { type: GENERATE_DICTIONARY_TEXT_INDEX }
}

export function initDictionaryText() {
  return { type: INIT_DICTIONARY_TEXT }
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
  return { type: START_COUNTDOWN_TIMER }
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

export function loadDictionaries() {
  return (dispatch, getState) => {
  	dispatch(pendingDictionaries())

  	fetch('/dictionaries.json')
		.then ( res => res.json())
    .then ( data => {
        dispatch(loadDictionarySuccess(data))
        dispatch(randomDictionary())
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