export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }

  return string[0].toUpperCase() + string.slice(1)
}

export function range(start, end) {
  const isString = typeof start === 'string' && typeof end === 'string'
  if (isString) {
    start = start.codePointAt(0)
    end = end.codePointAt(0)
  }

  if (start > end) {
    [end, start] = [start, end]
  }

  return new Array(end - start + 1)
      .fill('')
      .map((_, index) => {
        if (isString) {
          return String.fromCodePoint(start + index)
        }
        return start + index
      })
}

export function storage(key, data = null) {
  if (data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  return JSON.parse(localStorage.getItem(key))
}

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }

  return a === b
}

export function debounce(fn, wait) {
  let timeout

  return function(...args) {
    const later = () => {
      clearTimeout(timeout)
      // eslint-disable-next-line no-invalid-this
      fn.apply(this, args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
