function createErr(msg) {
    return {
        error: true,
        message: msg
    }
}

var valid = { valid: true }

exports.compose = function compose(tjekkers) {
    return function(value) {
        var firstError = null
        var count = 0
        var results = tjekkers.map(function(tjekker) {
            var result = tjekker(value)
            if (!err && result.error) firstError = result
            if (result.error) count++
            return result
        })
        if (!firstError) return valid
        var err = createErr(firstError.message) // clone error
        err.results = results
        err.count = count
        return err
    }
}

exports.make = function make(fn) {
    return function(value) {
        var result = fn(value)
        if (!result) return valid
        return createErr(result)
    }
}

exports.minNumber = function minNumber(n) {
    return function minNumber(value) {
        if (Number(value) >= n) return valid
        return createErr("Should be greater than " + n)
    }
}

exports.maxNumber = function maxNumber(n) {
    return function maxNumber(value) {
        if (Number(value) <= n) return valid
        return createErr("Should be less than " + n)
    }
}

exports.betweenNumber = function betweenNumber(min, max) {
    return function betweenNumber(value) {
        value = Number(value)
        if (value >= min && value <= max) return valid
        return createErr("Should be less than " + n)
    }
}

exports.present = function present() {
    return function present(value) {
        if (value) return valid
        return createErr("Should not be empty")
    }
}

exports.not = function not(str) {
    return function not(value) {
        if (value !== str) return valid
        return createErr("Should not be " + str)
    }
}

exports.exact = function exact(str) {
    return function exact(value) {
        if (value === str) return valid
        return createErr("Should be exactly " + str)
    }
}

exports.oneOf = function oneOf(strs) {
    return function oneOf(value) {
        function eq(str) {
            return str === value
        }
        if (strs.find(eq)) return valid
        return createErr("Should be one of " + strs.join(", "))
    }
}

exports.contains = function contains(str) {
    return function contains(value) {
        if (value.indexOf(str) > -1) return valid
        return createErr("Should contain " + str)
    }
}

exports.minLength = function minLength(n) {
    return function minLength(value) {
        if (value.length >= n) return valid
        return createErr("Should be at least " + n)
    }
}

exports.maxLength = function maxLength(n) {
    return function maxLength(value) {
        if (value.length <= n) return valid
        return createErr("Should be no longer than " + n)
    }
}
