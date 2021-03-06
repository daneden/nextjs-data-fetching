import data from "../data.json"

export type BitcoinData = typeof data
export interface ProcessedData {
    currency: string
    bitcoinRate: number
    symbol: string
}

export default function processData(data: BitcoinData): Array<ProcessedData> {
    const currencyRates = Object.values(data.bpi)
    const filteredCurrencyRates = currencyRates.map(rate => ({
        currency: rate.description,
        bitcoinRate: rate.rate_float,
        symbol: rate.symbol
    }))

    return filteredCurrencyRates
}