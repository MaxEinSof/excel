import { clone } from '@core/utils'

export class Store {
  constructor(rootReducer, initialState = {}) {
    this.state = rootReducer({ ...initialState }, { type: '__INIT__' })
    this.rootReducer = rootReducer
    this.listeners = []
  }

  subscribe(fn) {
    this.listeners.push(fn)

    return {
      unsubscribe: () => {
        this.listeners = this.listeners.filter((listener) => listener !== fn)
      }
    }
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action)
    this.listeners.forEach((listener) => listener(this.state))
  }

  getState() {
    return clone(this.state)
  }
}
