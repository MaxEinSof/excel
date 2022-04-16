const CODES = {
  A: 65,
  Z: 90
}

const columnsNumber = CODES.Z - CODES.A + 1

function getCellTemplate(rowNumber) {
  return function(letter) {
    return `
      <div class="table__cell" contenteditable="true" data-column="${letter}" data-id="${letter}:${rowNumber}"></div>
    `
  }
}

function getColumnTemplate(letter) {
  return `
    <div class="table__column" data-type="resizable">
      ${letter}

      <div class="table__column-resize" data-resize="col"></div>
    </div>
  `
}

function getRowTemplate(content, number = '') {
  const isAbcRow = !number

  return `
    <div class="table__row ${isAbcRow ? 'table__abc-row' : ''}" ${!isAbcRow ? 'data-type="resizable"' : ''}>
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

function getAbcArray() {
  return new Array(columnsNumber)
      .fill('')
      .map((_, index) => String.fromCharCode(CODES.A + index))
}

function getAbcRowTemplate() {
  const abcColumnsTemplate = getAbcArray()
      .map(getColumnTemplate)
      .join('')

  return getRowTemplate(abcColumnsTemplate)
}

function getCellsRowTemplates(rowsNumber) {
  const templates = []

  for (let rowNumber = 1; rowNumber <= rowsNumber; rowNumber++) {
    const cellsTemplate = getAbcArray()
        .map(getCellTemplate(rowNumber))
        .join('')

    const cellsRowTemplate = getRowTemplate(cellsTemplate, rowNumber)
    templates.push(cellsRowTemplate)
  }

  return templates
}

export function getTableTemplate(rowsNumber = 100) {
  const rows = []

  const abcRowTemplate = getAbcRowTemplate()
  rows.push(abcRowTemplate)

  const cellsRowTemplates = getCellsRowTemplates(rowsNumber)
  rows.push(...cellsRowTemplates)

  return rows.join('')
}
