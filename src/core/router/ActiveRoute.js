export class ActiveRoute {
  static get path() {
    return window.location.hash.slice(1)
  }

  static get name() {
    return ActiveRoute.path.split('/')[0]
  }

  static get param() {
    return ActiveRoute.path.split('/')[1]
  }
}
