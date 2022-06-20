import { DomListener } from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.name, options.listeners)

    this.store = options.store
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.unsubscribers = []

    this.preInit()
  }

  preInit() {}

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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  $getState() {
    return this.store.getState()
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsubscribe) => unsubscribe())
  }
}
