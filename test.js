const assert = require('assert')
const Pratishat = require('./')

let p

/* ---------------------------- Encode / Decode ----------------------------- */

p = new Pratishat(['a', 'b', 'c'])

assert.strictEqual(p.encode('a'), '%61')
assert.strictEqual(p.decode('%61'), 'a')

assert.strictEqual(p.encode('aa'), '%61%61')
assert.strictEqual(p.decode('%61%61'), 'aa')

assert.strictEqual(p.encode('a%20a'), '%61%20%61')
assert.strictEqual(p.decode('%61%20%61'), 'a a') // decode all

assert.strictEqual(p.encode(' a '), ' %61 ')
assert.strictEqual(p.decode(' %61 '), ' a ')

assert.strictEqual(p.encode('abc'), '%61%62%63')
assert.strictEqual(p.decode('%61%62%63'), 'abc')

assert.strictEqual(p.encode('%"x"%'), '%"x"%')

/* ----------------------------- Double Encode ------------------------------ */

p = new Pratishat(['%'])

assert.strictEqual(p.encode('%'), '%25')
assert.strictEqual(p.encode('%20'), '%2520') // double encode

/* ------------------------------ Encode Order ------------------------------ */

p = new Pratishat(['$', '%'])

assert.strictEqual(p.encode('$%'), '%2524%25')
assert.strictEqual(p.decode('%2524%25'), '%24%')

assert.strictEqual(p.encode('%$'), '%25%2524')
assert.strictEqual(p.decode('%25%2524'), '%%24')

p = new Pratishat(['%', '$'])

assert.strictEqual(p.encode('$%'), '%24%25')
assert.strictEqual(p.decode('%24%25'), '$%')

assert.strictEqual(p.encode('%$'), '%25%24')
assert.strictEqual(p.decode('%25%24'), '%$')

/* -------------------------------- Decoding -------------------------------- */

p = new Pratishat(['a'])

assert.strictEqual(p.encode('a'), '%61')
assert.strictEqual(p.decode('%61'), 'a')

assert.strictEqual(p.decode('%2525'), '%25')

assert.strictEqual(p.decode('%XX'), null) // invalid escapes

/* ------------------------------ Invalid Char ------------------------------ */

try {
  p = new Pratishat([''])
} catch (error) {
  assert.strictEqual(error.message, '"" is not a single-byte character')
}

try {
  p = new Pratishat(['🤔'])
} catch (error) {
  assert.strictEqual(error.message, '"🤔" is not a single-byte character')
}

try {
  p = new Pratishat(['Ω'])
} catch (error) {
  assert.strictEqual(error.message, 'String contains non ISO-8859-1 code point')
}
