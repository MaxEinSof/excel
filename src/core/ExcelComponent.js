import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.name, options.listeners)

    this.emitter = options.emitter
    this.unsubscribers = []
  }

  getTemplate() {
    return ''
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsubscribe = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsubscribe)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsubscribe) => unsubscribe())
  }
}
