import { $ } from '@core/dom'

export class Excel {
  constructor(selector, options) {
    this.$appRoot = $(selector)
    this.components = options.components
  }

  getContent() {
    const $contentRoot = $.create('div', 'excel')
    const $topContainer = $.create('div', 'excel__top-container')

    $contentRoot.append($topContainer)

    this.components = this.components.map((Component) => {
      const $componentRoot = $.create('div', Component.className)
      const component = new Component($componentRoot)
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
}
