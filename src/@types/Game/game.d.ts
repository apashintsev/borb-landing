export type Asset = 'USDT' | 'USDC'

export type TimeframeName = '5m' | '15m' | '30m' | '1h' | '4h' | '24h'
export type Timeframe = {
    name: TimeframeName
    value: number
}

export type CurrencyTicker =
    | 'BTC'
    | 'ETH'
    | 'SOL'
    | 'BNB'
    | 'ADA'
    | 'DOT'
    | 'MATIC'
    | 'DOGE'
    | 'ATOM'
    | 'AVAX'

export type Currency = {
    ticker: CurrencyTicker
    price: number
}
