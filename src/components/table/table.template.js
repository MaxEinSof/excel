import { parse } from '@core/parse'

const CODES = {
  A: 65,
  Z: 90
}

const columnsNumber = CODES.Z - CODES.A + 1

function getCellTemplate(rowNumber, state) {
  return function(letter) {
    const cellId = `${letter}:${rowNumber}`
    const data = state.dataState[cellId] || ''

    return `
      <div class="table__cell" contenteditable="true" data-column="${letter}" data-id="${cellId}" data-value="${data}" ${setColumnWidth(state, letter)}>
        ${parse(data)}
      </div>
    `
  }
}

function getColumnTemplate(state) {
  return function(letter) {
    return `
      <div class="table__column" data-type="resizable" data-column="${letter}" ${setColumnWidth(state, letter)}>
        ${letter}
  
        <div class="table__column-resize" data-resize="col"></div>
      </div>
    `
  }
}

function setColumnWidth({ colState }, letter) {
  return colState[letter] ? `style="width: ${colState[letter]}px"` : ''
}

function getRowTemplate(content, number = '', state = {}) {
  const isAbcRow = !number

  return `
    <div class="table__row ${isAbcRow ? 'table__abc-row' : ''}" ${!isAbcRow ? `data-type="resizable" data-row="${number}"` : ''} ${!isAbcRow ? setRowHeight(state, number) : ''}>
      <div class="table__row-numbering">
        ${number}
      </div>
      
      ${!isAbcRow ? '<div class="table__row-resize" data-resize="row"></div>' : ''}

      <div class="table__row-content">
        ${content}
      </div>
    </div>
  `
}

function setRowHeight({ rowState }, number) {
  return rowState[number] ? `style="height: ${rowState[number]}px"` : ''
}

function getAbcArray() {
  return new Array(columnsNumber)
      .fill('')
      .map((_, index) => String.fromCharCode(CODES.A + index))
}

function getAbcRowTemplate(state) {
  const abcColumnsTemplate = getAbcArray()
      .map(getColumnTemplate(state))
      .join('')

  return getRowTemplate(abcColumnsTemplate)
}

function getCellsRowTemplates(rowsNumber, state) {
  const templates = []

  for (let rowNumber = 1; rowNumber <= rowsNumber; rowNumber++) {
    const cellsTemplate = getAbcArray()
        .map(getCellTemplate(rowNumber, state))
        .join('')

    const cellsRowTemplate = getRowTemplate(cellsTemplate, rowNumber, state)
    templates.push(cellsRowTemplate)
  }

  return templates
}

export function getTableTemplate(rowsNumber, state) {
  const rows = []

  const abcRowTemplate = getAbcRowTemplate(state)
  rows.push(abcRowTemplate)

  const cellsRowTemplates = getCellsRowTemplates(rowsNumber, state)
  rows.push(...cellsRowTemplates)

  return rows.join('')
}
