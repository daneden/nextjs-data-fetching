import data from "../data.json"

type BitcoinData = typeof data

export default function processData(data: BitcoinData) {
    const currencyRates = Object.values(data.bpi)
    const filteredCurrencyRates = currencyRates.map(rate => ({
        currency: rate.description,
        bitcoinRate: rate.rate
    }))

    return filteredCurrencyRates
}