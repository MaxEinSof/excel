import { storage } from '@core/utils'
import { defaultTitle, defaultStyles } from '@/constants'

const defaultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles
}

function normalizeState(state) {
  return {
    ...state,
    currentText: '',
    currentStyles: defaultStyles
  }
}

export const initialState = storage('excel-state')
  ? normalizeState(storage('excel-state'))
  : defaultState
