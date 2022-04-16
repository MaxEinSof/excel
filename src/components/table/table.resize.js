import { $ } from '@core/dom'

export default function resizeTable(mouseEvent, $root) {
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

      $parent.css({ width: `${coords.width + delta}px` })

      const columnLetter = $parent.text()
      const columnCells = $root.findAll(`[data-column="${columnLetter}"]`)
      columnCells.forEach((cell) => {
        cell.style.width = `${coords.width + delta}px`
      })

      document.onmousemove = null
      document.onmouseup = null
    }
  } else if (resizeType === 'row') {
    document.onmousemove = (e) => {
      delta = e.pageY - coords.bottom
      $resizer.css({ bottom: `${-delta}px` })
    }

    document.onmouseup = () => {
      $resizer.css({ bottom: 0 })

      $parent.css({ height: `${coords.height + delta}px` })

      document.onmousemove = null
      document.onmouseup = null
    }
  }
}
