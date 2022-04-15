
export type Percent = {
    value: Number
}

export function createPercent(number: Number): Percent {
    if (number < 0 || number > 100) {
        throw 'ERR: Not a percent'
    }
    return {
        value: number
    }
}
