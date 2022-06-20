export function parse(value = '') {
  if (value.startsWith('=')) {
    const lastChar = value.slice(-1)

    if (Number.isInteger(+lastChar)) {
      return eval(value.slice(1))
    }

    return eval(value.slice(1, -1))
  }

  return value
}
