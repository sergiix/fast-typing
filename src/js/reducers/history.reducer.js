import {
  LOAD_HISTORY,
  ADD_HISTORY,
  SAVE_HISTORY
} from '../constants'

let initialState = {
  key: 'history',
  data: []
}

export default function historyReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_HISTORY: {
      let key = state.key
      let data = localStorage.getItem(key);

      if (data) {
        try {
          data = JSON.parse(data)
        } catch(e) {}
      }

      data = data ? data : []

      return {
        ...state,
        data: data
      }
    }

    case ADD_HISTORY: {
      state.data.push([action.time, action.speed])
      return {
        ...state,
        lastHistoryValue: [action.time, action.speed]
      }
    }

    case SAVE_HISTORY: {
      let key = state.key

      try {
        localStorage.setItem(key, JSON.stringify(state.data))
      } catch(e) {}

      return {...state}
    }

    default:
      return state;
  }
}
