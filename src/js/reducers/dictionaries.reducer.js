import {
  LOAD_DICTIONARIES_PENDING,
  LOAD_DICTIONARIES_SUCCESS,
  LOAD_DISTIONARIES_ERROR,
  RANDOM_DICTIONARY
} from '../constants'

export default function dictionariesReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_DICTIONARIES_PENDING: {
      return {
        ...state,
        isError: false,
        isPending: true,
        isSuccess: false
      }
    }

    case LOAD_DICTIONARIES_SUCCESS: {
      return {
        ...state,
        isSuccess: true,
        isPending: false,
        isError: false,
        // list: action.payload.dictionaries
        list: {
          0: [
            'a b c'
          ]
        }
      }
    }

    case LOAD_DISTIONARIES_ERROR: {
      return {
        ...state,
        isPending: false,
        isSuccess: false,
        isError: true,
        errorMessage: action.payload
      }
    }

    case RANDOM_DICTIONARY: {
      let selectedDictionaryId = 0;
      let selectedDictionaryTextId = Math.floor(Math.random() * state.list[0].length)
      let text = state.list[selectedDictionaryId][selectedDictionaryTextId]
      return {
        ...state,
        selectedDictionaryId: 0,
        selectedDictionaryTextId: selectedDictionaryTextId,
        text: text
      }
    }

    default:
      return state;
  }
}
