const CODES = {
  A: 65,
  Z: 90
}

const columnsNumber = CODES.Z - CODES.A + 1

function getCellTemplate() {
  return `
    <div class="table__cell" contenteditable="true"></div>
  `
}

function getColumnTemplate(content) {
  return `
    <div class="table__column">
      ${content}
    </div>
  `
}

function getRowTemplate(content, number = '') {
  const isAbcRow = !number

  return `
    <div class="table__row ${isAbcRow ? 'table__abc-row' : ''}">
      <div class="table__row-numbering">
        ${number}
      </div>

      <div class="table__row-content">
        ${content}
      </div>
    </div>
  `
}

function getAbcRowTemplate() {
  const abcColumnsTemplate = new Array(columnsNumber)
      .fill('')
      .map((_, index) => String.fromCharCode(CODES.A + index))
      .map(getColumnTemplate)
      .join('')

  return getRowTemplate(abcColumnsTemplate)
}

function getCellsRowTemplates(rowsNumber) {
  const templates = []

  for (let i = 0; i < rowsNumber; i++) {
    const cellsTemplate = new Array(columnsNumber)
        .fill('')
        .map(getCellTemplate)
        .join('')

    const cellsRowTemplate = getRowTemplate(cellsTemplate, i + 1)
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
