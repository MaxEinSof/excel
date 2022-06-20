import { $ } from '@core/dom'
import { Emitter } from '@core/Emitter'
import { StoreSubscriber } from '@core/StoreSubscriber'

export class Excel {
  constructor(selector, options) {
    this.$appRoot = $(selector)
    this.components = options.components
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getContent() {
    const $contentRoot = $.create('div', 'excel')
    const $topContainer = $.create('div', 'excel__top-container')

    $contentRoot.append($topContainer)

    const componentOptions = {
      store: this.store,
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

    this.subscriber.subscribeComponents(this.components)
    this.components.forEach((component) => component.init())
  }

  destroy() {
    this.subscriber.unsubscribeFromStore()
    this.components.forEach((component) => component.destroy())
  }
}
