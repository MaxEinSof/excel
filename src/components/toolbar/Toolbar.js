import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { getToolbarTemplate } from '@/components/toolbar/toolbar.template'
import { $ } from '@core/dom'
import { defaultStyles } from '@/constants'

export class Toolbar extends ExcelStateComponent {
  static className = 'toolbar'
  static parentClassName = 'excel__top-container'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options
    })
  }

  preInit() {
    this.initState(defaultStyles)
  }

  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  get template() {
    return getToolbarTemplate(this.state)
  }

  getTemplate() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)

    if ($target.dataset.type === 'button') {
      const value = JSON.parse($target.dataset.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
