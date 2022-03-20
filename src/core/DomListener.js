import { capitalize } from '@core/utils'

export class DomListener {
  constructor($root, name = '', listeners = []) {
    this.$root = $root
    this.name = name
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener)

      if (!this[methodName]) {
        throw new Error(`Method ${methodName} is not implemented in ${this.name} Component`)
      }

      this[methodName] = this[methodName].bind(this)

      this.$root.on(listener, this[methodName])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const methodName = getMethodName(listener)
      this.$root.off(listener, this[methodName])
    })
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`
}
