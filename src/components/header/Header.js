import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { changeTitle } from '@/store/actions'
import { debounce } from '@core/utils'

export class Header extends ExcelComponent {
  static className = 'header'
  static parentClassName = 'excel__top-container'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  preInit() {
    this.onInput = debounce(this.onInput, 300)
  }

  onInput(event) {
    const $target = $(event.target)
    this.$dispatch(changeTitle($target.text()))
  }

  getTemplate() {
    const title = this.store.getState().title

    return `
      <input class="header__input" type="text" value="${title}">

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
