import {
  GENERATE_DICTIONARY_TEXT_INDEX,
  INIT_DICTIONARY_TEXT,
  START_TYPING,
  FINISH_TYPING,
  START_COUNTDOWN_TIMER,
  COUNTDOWN_TIMER_TICK,
  COUNTDOWN_TIMER_ENDED,
  UPDATE_TEXT,
  COMPARE_TEXT,
  CLEAR_TYPING_STATISTICS
} from '../constants'

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case INIT_DICTIONARY_TEXT: {
      return {
        ...state,
        text: action.payload
      }
    }

    case START_TYPING: {
      return {
        ...state,
        isStarted: true,
        isTyping: true,
        isFinished: false,
        index: 0,
        fullValue: '',
        partValue: '',
        isCompleted: false,
        countErrors: 0,
        speed: 0,
        wordIndex: 0,
        beginTime: Date.now()
      }
    }

    case FINISH_TYPING: {
      return {
        ...state,
        isStarted: false,
        isTyping: false,
        isFinished: true,
        isError: false,
        isCompleted: false,
        fullValue: 0,
        partValue: action.payload,
        duration: 0,
        wordIndex: -1,
        countdownTimer: {
          ...state.countdownTimer,
          text: ''
        }
      }
    }

    case CLEAR_TYPING_STATISTICS: {
      return {
        ...state,
        countErrors: 0,
        speed: 0
      }
    }

    case START_COUNTDOWN_TIMER: {
      return {
        ...state,
        countdownTimer: {
          ...state.countdownTimer,
          started: true,
          ended: false,
          left: state.countdownTimer.seconds,
          id: action.payload
        }
      }
    }

    case COUNTDOWN_TIMER_TICK: {
      let left = --state.countdownTimer.left;
      return {
        ...state,
        partValue: 'Start typing in ' + left + ' sec.',
        countdownTimer: {
          ...state.countdownTimer,
          left
        }
      }
    }


    case COUNTDOWN_TIMER_ENDED: {
      return {
        ...state,
        countdownTimer: {
          ...state.countdownTimer,
          started: false,
          ended: true
        }
      }
    }

    case UPDATE_TEXT: {
      if (!state.isCompleted)
        state.partValue = action.payload;
      return {...state}
    }

    case COMPARE_TEXT: {
      if (state.isCompleted)
        return state;

      let isPreviousError = state.isError
      let fullValue = state.fullValue
      let partValue = state.partValue
      let text = state.text
      let typedText = fullValue + partValue
      let isError = text.indexOf(typedText) != 0
      let countErrors = state.countErrors
      let endTime = Date.now()
      let speed = state.speed;
      let duration = (endTime - state.beginTime) / 1000
      let wordIndex = state.wordIndex

      if (!isError)
        speed = typedText.length / duration *  60;

      if (!isError && partValue[partValue.length - 1] === ' ') {
        fullValue += partValue;
        partValue = '';
        wordIndex++;
      }

      let isCompleted = !isError && text.length == typedText.length

      if (isError && !isPreviousError)
        countErrors++

      if (isCompleted)
        speed = (typedText.length - countErrors) / duration * 60

      return {
        ...state,
        isError,
        isCompleted,
        fullValue,
        partValue: isCompleted ? '' : partValue,
        duration,
        countErrors,
        speed: ~~speed,
        wordIndex
      }
    }

    default:
      return state;
  }
}
