import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { getTableTemplate } from '@/components/table/table.template'
import { TableSelection } from '@/components/table/TableSelection'
import resizeTable from '@/components/table/table.resize'
import { matrix, nextSelector } from '@/components/table/table.functions'

export class Table extends ExcelComponent {
  static className = 'table'
  static parentClassName = 'excel'
  static rowsNumber = 100

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'input', 'keydown'],
      ...options
    })

    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find(`[data-id="A:1"]`)
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell.text())
  }

  onMousedown(event) {
    const { resize, id } = event.target.dataset

    if (resize) {
      resizeTable(event, this.$root)
    } else if (id) {
      const $cell = $(event.target)

      if (event.shiftKey) {
        const $cells = matrix($cell, this.selection.current)
            .map((id) => this.$root.find(`[data-id="${id}"]`))

        this.selection.selectGroup($cells)
      } else {
        this.selectCell($cell)
      }
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter', 'Tab']

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()

      const selector = nextSelector(
          event.key,
          this.selection.current,
          Table.rowsNumber
      )

      const $cell = this.$root.find(selector)
      this.selectCell($cell)
    }
  }

  getTemplate() {
    return getTableTemplate(Table.rowsNumber)
  }
}
