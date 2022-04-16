import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
  static className = 'header'
  static parentClassName = 'excel__top-container'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      ...options
    })
  }

  getTemplate() {
    return `
      <input class="header__input" type="text" value="Новая таблица">

      <div class="header__button-container">
        <button class="header__button" type="button">
          <span class="material-icons">delete</span>
        </button>

        <button class="header__button" type="button">
          <span class="material-icons">exit_to_app</span>
        </button>
      </div>
    `
  }
}
