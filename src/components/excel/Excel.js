import { $ } from '@core/dom'
import { Emitter } from '@core/Emitter'

export class Excel {
  constructor(selector, options) {
    this.$appRoot = $(selector)
    this.components = options.components
    this.emitter = new Emitter()
  }

  getContent() {
    const $contentRoot = $.create('div', 'excel')
    const $topContainer = $.create('div', 'excel__top-container')

    $contentRoot.append($topContainer)

    const componentOptions = {
      emitter: this.emitter
    }

    this.components = this.components.map((Component) => {
      const $componentRoot = $.create('div', Component.className)
      const component = new Component($componentRoot, componentOptions)
      $componentRoot.html(component.getTemplate())

      switch (Component.parentClassName) {
        case $contentRoot.class:
          $contentRoot.append($componentRoot)
          break
        case $topContainer.class:
          $topContainer.append($componentRoot)
          break
      }

      return component
    })

    return $contentRoot
  }

  render() {
    this.$appRoot.append(this.getContent())

    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.components.forEach((component) => component.destroy())
  }
}
