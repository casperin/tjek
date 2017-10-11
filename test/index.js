var tape = require("tape")
var tjek = require("../index")

tape('Basic present', function (t) {
    var isPresent = tjek.present()

    var resp1 = isPresent('')
    t.ok(resp1.error, 'Should be an error')

    var resp2 = isPresent('foo')
    t.ok(resp2.valid, 'should be valid')

    t.end()
})

tape('Basic oneOf', function (t) {
    var isOneOf = tjek.oneOf(['one', 'two'])

    var resp1 = isOneOf('three')
    t.ok(resp1.error, 'Should be an error')

    var resp2 = isOneOf('one')
    t.ok(resp2.valid, 'should be valid')

    t.end()
})

tape('compose', function (t) {
    var tjekker = tjek.compose([
        tjek.minLength(3),
        tjek.contains('a')
    ])

    var resp1 = tjekker('aa') // too short
    t.ok(resp1.error, 'Should be an error')

    var resp2 = tjekker('bcd') // no `a`
    t.ok(resp2.error, 'Should be an error')

    var resp3 = tjekker('abc')
    t.ok(resp3.valid, 'Should be valid')

    var resp4 = tjekker('x') // everything wrong
    t.equal(resp4.results.length, 2, 'Should return two results')
    t.equal(resp4.count, 2, 'Should return the number of errors')
    var errors = resp4.results.filter(function (r) {
        return r.error
    })
    t.equal(errors.length, 2, 'Should return two errors')

    t.end()
})

tape('make', function (t) {
    var tjekker = tjek.make(function (value) {
        if (value.length === 2 || value.length === 4) return
        return 'Should be either 2 or 4 characters long'
    })

    var resp1 = tjekker('aa')
    t.ok(resp1.valid, 'Should be valid')

    var resp2 = tjekker('a')
    t.ok(resp2.error, 'Should be an error')

    t.end()
})
