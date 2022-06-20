import { TABLE_RESIZE, CHANGE_TEXT, CHANGE_STYLES, APPLY_STYLE, CHANGE_TITLE } from '@/store/types'

export function rootReducer(state, action) {
  let propName

  switch (action.type) {
    case TABLE_RESIZE:
      propName = action.data.type === 'col' ? 'colState' : 'rowState'

      return {
        ...state,
        [propName]: getValue(state, propName, action)
      }
    case CHANGE_TEXT:
      propName = 'dataState'

      return {
        ...state,
        currentText: action.data.value,
        [propName]: getValue(state, propName, action)
      }
    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: action.data
      }
    case APPLY_STYLE:
      propName = 'stylesState'

      return {
        ...state,
        [propName]: getValue(state, propName, action),
        currentStyles: {
          ...state.currentStyles,
          ...action.data.value
        }
      }
    case CHANGE_TITLE:
      return {
        ...state,
        title: action.data
      }
    default:
      return state
  }
}

function getValue(state, propName, action) {
  const value = state[propName] || {}

  if (action.data.ids) {
    action.data.ids.forEach((id) => {
      value[id] = {
        ...value[id],
        ...action.data.value
      }
    })
  } else {
    value[action.data.id] = action.data.value
  }

  return value
}
