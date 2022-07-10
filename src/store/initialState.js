import { defaultTitle, defaultStyles } from '@/constants'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  date: new Date().toJSON()
}

function normalizeState(state) {
  return {
    ...state,
    currentText: '',
    currentStyles: defaultStyles
  }
}

export function normalizeInitialState(state) {
  return state ? normalizeState(state) : defaultState
}
