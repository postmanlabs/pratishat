const fastDecode = require('fast-decode-uri-component')

module.exports = class Pratishat {
  constructor (chars) {
    this.chars = [...chars]
    this.encodeMap = {}

    const latin1 = /[^\u0000-\u00ff]/ // eslint-disable-line

    for (const char of this.chars) {
      if (char.length !== 1) {
        throw new Error(`"${char}" is not a single-byte character`)
      }

      if (latin1.test(char)) {
        throw new Error('String contains non ISO-8859-1 code point')
      }

      const hex = (char.charCodeAt(0)).toString(16).toUpperCase()

      this.encodeMap[char] = hex.length === 1 ? `%0${hex}` : `%${hex}`
    }
  }

  encode (value) {
    let i,
      ii,
      char,
      index,
      _value,
      encoded,
      pointer

    for (i = 0, ii = this.chars.length; i < ii; i++) {
      _value = ''
      pointer = 0
      char = this.chars[i]
      encoded = this.encodeMap[char]

      while ((index = value.indexOf(char, pointer)) > -1) {
        _value += value.slice(pointer, index) + encoded
        pointer = index + 1
      }

      if (pointer === 0) {
        continue
      }

      value = pointer < value.length ? _value + value.slice(pointer) : _value
    }

    return value
  }

  decode (value) {
    return fastDecode(value)
  }
}
