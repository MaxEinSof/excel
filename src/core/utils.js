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
