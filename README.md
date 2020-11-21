# % प्रतिशत %
Percent-encode specific characters in the string.

## Usage
```js
const Pratishat = require('pratishat')
const pratishat = new Pratishat(['=', '$'])

pratishat.encode('"="') // '"%3D"'
pratishat.encode('$399') // '%24399'
pratishat.decode('%2525') // '%25'
```
