import { BigNumber, BigNumberish } from '@ethersproject/bignumber'
import { One, Zero } from '@ethersproject/constants'
import { formatBalance, isEmptyValue, parseBalance } from '../utils'

class Fraction {
    static BASE = BigNumber.from(10).pow(18)

    static NAN = new Fraction(Zero, Zero)

    static ZERO = new Fraction(Zero, One)

    static convert(sdk) {
        return new Fraction(BigNumber.from(sdk.numerator.toString()), BigNumber.from(sdk.denominator.toString()))
    }

    static from(numerator, denominator) {
        return new Fraction(BigNumber.from(numerator), BigNumber.from(denominator))
    }

    static parse(value) {
        return value === ''
            ? Fraction.NAN
            : isEmptyValue(value)
            ? Fraction.ZERO
            : new Fraction(parseBalance(value, 18), Fraction.BASE)
    }

    numerator
    denominator

    constructor(numerator, denominator) {
        this.numerator = numerator
        this.denominator = denominator
    }

    isZero() {
        return !this.isNaN() && this.numerator.isZero()
    }

    isNaN() {
        return this.denominator.isZero()
    }

    eq(fraction) {
        return this.numerator
            .mul(fraction.denominator)
            .div(fraction.numerator)
            .eq(this.denominator)
    }

    gt(fraction) {
        return this.numerator
            .mul(fraction.denominator)
            .div(fraction.numerator)
            .gt(this.denominator)
    }

    lt(fraction) {
        return this.numerator
            .mul(fraction.denominator)
            .div(fraction.numerator)
            .lt(this.denominator)
    }

    toString(maxFractions = 8) {
        if (this.isNaN()) return ''
        if (this.isZero()) return '0'
        let str = formatBalance(this.numerator.mul(Fraction.BASE).div(this.denominator), 18, maxFractions)
        if (str.endsWith('.0')) str = str.substring(0, str.length - 2)
        return str
    }

    apply(value) {
        return this.denominator.isZero() ? Zero : this.numerator.mul(value).div(this.denominator)
    }
}

export default Fraction
