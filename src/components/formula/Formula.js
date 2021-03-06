import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'formula'
  static parentClassName = 'excel__top-container'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
      ...options
    })
  }

  init() {
    super.init()

    this.$input = this.$root.find('#formula')

    this.$on('table:select', ($cell) => {
      this.$input.text($cell.attr('data-value') || $cell.text())
    })
  }

  storeChanged({ currentText }) {
    this.$input.text(currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']

    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }

  getTemplate() {
    return `
      <div class="formula__label">fx</div>

      <div id="formula" class="formula__input" contenteditable="true" spellcheck="false"></div>
    `
  }
}
