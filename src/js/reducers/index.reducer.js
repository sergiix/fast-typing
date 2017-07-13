import * as t from '../constants'

export default function rootReducer(state = {}, action) {
  switch (action.type) {
    case t.GENERATE_DICTIONARY_TEXT_INDEX: {
      let countOfText = state.dictionaries[state.typing.selectedDictionaryIndex].length
      let index = Math.random() * countOfText
      state.typing.selectedDictionaryTextIndex = Math.floor(index)
      return {...state}
    }

    case t.INIT_DICTIONARY_TEXT: {
      return {
        ...state,
        typing: {
          ...state.typing,
          text: state.dictionaries[state.typing.selectedDictionaryIndex][state.typing.selectedDictionaryTextIndex],
          index: 0,
          fullValue: '',
          partValue: '',
          isCompleted: false,
          countErrors: 0,
          beginTime: Date.now(),
          speed: 0
        }
      }
    }

    case t.START_TYPING: {
      return {
        ...state,
        typing: {
          ...state.typing,
          isStarted: true,
          isTyping: true,
          isFinished: false
        }
      }
    }

    case t.FINISH_TYPING: {
      return {
        ...state,
        typing: {
          ...state.typing,
          isStarted: false,
          isTyping: false,
          isFinished: true
        }
      }
    }

    case t.START_COUNTDOWN_TIMER: {
      return {
        ...state,
        countdownTimer: {
          ...state.countdownTimer,
          started: true,
          ended: false,
          left: state.countdownTimer.seconds
        }
      }
    }

    case t.COUNTDOWN_TIMER_TICK: {
      return {
        ...state,
        typing: {
          ...state.typing,
          countdownTimer: {
            ...state.typing.countdownTimer,
            left: --state.typing.countdownTimer.left
          }
        }
      }
    }


    case t.COUNTDOWN_TIMER_ENDED: {
      return {
        ...state,
        countdownTimer: {
          ...state.typing.countdownTimer,
          started: false,
          ended: true
        }
      }
    }

    case t.UPDATE_TEXT: {
      if (!state.typing.isCompleted)
        state.typing.partValue = action.payload;
      return {...state}
    }

    case t.COMPARE_TEXT: {
      if (state.typing.isCompleted)
        return state;

      let typing = state.typing
      let fullValue = typing.fullValue
      let partValue = typing.partValue
      let text = typing.text
      let typedText = fullValue + partValue
      let isError = text.indexOf(typedText) != 0
      let countErrors = typing.countErrors
      let endTime = Date.now()
      let speed = typing.speed;
      let duration = (endTime - typing.beginTime) / 1000

      if (!isError)
        speed = typedText.length / duration *  60;

      if (!isError && partValue[partValue.length - 1] === ' ') {
        fullValue += partValue;
        partValue = '';
      }

      let isCompleted = !isError && text.length == typedText.length

      if (isError)
        countErrors++

      if (isCompleted)
        speed = (typedText.length - countErrors) / duration * 60

      return {
        ...state,
        typing: {
          ...state.typing,
          isError: isError,
          isCompleted: isCompleted,
          fullValue: fullValue,
          partValue: isCompleted ? '' : partValue,
          duration: duration,
          countErrors: countErrors,
          speed: ~~speed
        }
      }
    }

    default:
      return state;
  }
}
