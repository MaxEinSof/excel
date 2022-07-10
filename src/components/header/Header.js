import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { changeTitle } from '@/store/actions'
import { debounce } from '@core/utils'
import { ActiveRoute } from '@core/router/ActiveRoute'

export class Header extends ExcelComponent {
  static className = 'header'
  static parentClassName = 'excel__top-container'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
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

  onClick(event) {
    const $target = $(event.target)

    if ($target.dataset.button === 'remove') {
      const decision = confirm('Вы действительно хотите удалить эту таблицу?')

      if (decision) {
        const keyToRemove = `${ActiveRoute.name}:${ActiveRoute.param}`
        localStorage.removeItem(keyToRemove)
        window.location.replace('/')
      }
    } else if ($target.dataset.button === 'exit') {
      window.location.assign('/')
    }
  }

  getTemplate() {
    const title = this.store.getState().title

    return `
      <input class="header__input" type="text" value="${title}">

      <div class="header__button-container">
        <button class="header__button" data-button="remove" type="button">
          <span class="material-icons" data-button="remove">delete</span>
        </button>

        <button class="header__button" data-button="exit" type="button">
          <span class="material-icons" data-button="exit">exit_to_app</span>
        </button>
      </div>
    `
  }
}
