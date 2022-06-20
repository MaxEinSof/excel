import { $ } from '@core/dom'

export default function resizeTable(mouseEvent, $root) {
  return new Promise((resolve) => {
    const $resizer = $(mouseEvent.target)
    const resizeType = $resizer.dataset.resize

    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    let delta

    if (resizeType === 'col') {
      document.onmousemove = (e) => {
        delta = e.pageX - coords.right
        $resizer.css({ right: `${-delta}px` })
      }

      document.onmouseup = () => {
        $resizer.css({ right: 0 })

        const width = coords.width + delta

        const columnLetter = $parent.dataset.column
        const columnCells = $root.findAll(`[data-column="${columnLetter}"]`)
        columnCells.forEach((cell) => {
          cell.style.width = `${width}px`
        })

        document.onmousemove = null
        document.onmouseup = null

        resolve({
          id: columnLetter,
          value: width,
          type: resizeType
        })
      }
    } else if (resizeType === 'row') {
      document.onmousemove = (e) => {
        delta = e.pageY - coords.bottom
        $resizer.css({ bottom: `${-delta}px` })
      }

      document.onmouseup = () => {
        $resizer.css({ bottom: 0 })

        const height = coords.height + delta
        const rowNumber = $parent.dataset.row

        $parent.css({ height: `${height}px` })

        document.onmousemove = null
        document.onmouseup = null

        resolve({
          id: rowNumber,
          value: height,
          type: resizeType
        })
      }
    }
  })
}
