# TJEK

Validate inputs.

It's late and I'm too tired to write any docs. Have a look at the (too few)
tests. It's very simple really.

## Some examples

```js
import tjek from 'tjek')

// some event listener
function onInputHandler (e) {
    var {error, message} = tjek.minLength(3)(e.target.value)
    if (error) throw new Error(message)
    // ...
}
```

```js
// Composing checks
import tjek from 'tjek')

const myCheck = tjek.compose([
    tjek.present(),
    tjek.not('fluppe de houp!')
])

myCheck('')
/*
{ error: true,
  message: 'Should not be empty',
  results: 
   [ { error: true, message: 'Should not be empty' },
     { valid: true } ],
  count: 1 }
*/

myCheck('fluppe de houp!')
/*
{ error: true,
  message: 'Should not be fluppe de houp!',
  results:
   [ { valid: true },
     { error: true, message: 'Should not be fluppe de houp!' } ],
  count: 1 }
*/

myCheck('hello')
/*
{ valid: true }
*/
```

