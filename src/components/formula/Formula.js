import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
  static className = 'formula'
  static parentClassName = 'excel__top-container'

  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input']
    })
  }

  onInput(event) {
    console.log('formula onInput: ', event.target.textContent)
  }

  getTemplate() {
    return `
      <div class="formula__label">fx</div>

      <div class="formula__input" contenteditable="true" spellcheck="false"></div>
    `
  }
}
