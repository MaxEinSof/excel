import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { getTableTemplate } from '@/components/table/table.template'
import { TableSelection } from '@/components/table/TableSelection'
import resizeTable from '@/components/table/table.resize'
import { matrix, nextSelector } from '@/components/table/table.functions'
import * as actions from '@/store/actions'
import { defaultStyles } from '@/constants'
import { parse } from '@core/parse'

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

    this.setCellStyles()

    const $cell = this.$root.find(`[data-id="A:1"]`)
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current
          .attr('data-value', text)
          .text(parse(text))
      this.updateTextInStore(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', (style) => {
      this.selection.applyStyle(style)
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIds
      }))
    })
  }

  setCellStyles() {
    const stylesState = this.$getState().stylesState
    Object.keys(stylesState).forEach((cellId) => {
      const $cell = this.$root.find(`[data-id="${cellId}"]`)
      $cell.css(stylesState[cellId])
    })
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)

    const styleNames = Object.keys(defaultStyles)
    const styles = $cell.getStyles(styleNames)

    styleNames.forEach((styleName) => {
      if (!styles[styleName]) {
        styles[styleName] = defaultStyles[styleName]
      }
    })

    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeHandler(event) {
    try {
      const data = await resizeTable(event, this.$root)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn(e.message)
    }
  }

  onMousedown(event) {
    const { resize, id } = event.target.dataset

    if (resize) {
      this.resizeHandler(event)
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
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
    return getTableTemplate(Table.rowsNumber, this.$getState())
  }
}
