import { range } from '@core/utils'

const MIN_ROW_NUMBER = 1
const MIN_COL_LETTER = 'A'
const MAX_COL_LETTER = 'Z'

export function matrix($target, $current) {
  const target = $target.id(true)
  const current = $current.id(true)

  const cols = range(current.col, target.col)
  const rows = range(current.row, target.row)

  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${col}:${row}`))
    return acc
  }, [])
}

export function nextSelector(key, $current, maxRowNumber) {
  let { col, row } = $current.id(true)

  switch (key) {
    case 'ArrowUp':
      if (row > MIN_ROW_NUMBER) {
        row--
      }
      break
    case 'ArrowDown':
    case 'Enter':
      if (row < maxRowNumber) {
        row++
      }
      break
    case 'ArrowLeft':
      if (col > MIN_COL_LETTER) {
        col = String.fromCodePoint(col.codePointAt(0) - 1)
      }
      break
    case 'ArrowRight':
    case 'Tab':
      if (col < MAX_COL_LETTER) {
        col = String.fromCodePoint(col.codePointAt(0) + 1)
      }
      break
  }

  return `[data-id="${col}:${row}"]`
}
