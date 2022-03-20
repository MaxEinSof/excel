import { ExcelComponent } from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
  static className = 'toolbar'
  static parentClassName = 'excel__top-container'

  constructor($root) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click']
    })
  }

  onClick(event) {

  }

  getTemplate() {
    return `
      <button class="toolbar__button" type="button">
        <span class="material-icons">format_bold</span>
      </button>

      <button class="toolbar__button" type="button">
        <span class="material-icons">format_italic</span>
      </button>

      <button class="toolbar__button" type="button">
        <span class="material-icons">format_underlined</span>
      </button>

      <button class="toolbar__button" type="button">
        <span class="material-icons">format_align_left</span>
      </button>

      <button class="toolbar__button" type="button">
        <span class="material-icons">format_align_center</span>
      </button>

      <button class="toolbar__button" type="button">
        <span class="material-icons">format_align_right</span>
      </button>
    `
  }
}
