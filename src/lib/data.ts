import { Asset, CurrencyTicker, Timeframe } from '../@types/Game/game'

interface AllowedCurrencies {
    id: number
    name: string
    ticker: CurrencyTicker
    img: string
}

export let allowedCurrencies: AllowedCurrencies[] = [
    {
        id: 0,
        name: 'Bitcoin',
        ticker: 'BTC',
        img: '/images/home/bitcoin.svg',
    },
    {
        id: 1,
        name: 'Ethereum',
        ticker: 'ETH',
        img: '/images/home/ethereum-eth-logo.svg?v=023',
    },
    {
        id: 2,
        name: 'Solana',
        ticker: 'SOL',
        img: '/images/home/solana-plain.svg',
    },
    {
        id: 3,
        name: 'BNB',
        ticker: 'BNB',
        img: '/images/home/bnb-bnb-logo.svg?v=023',
    },
    {
        id: 4,
        name: 'Cardano',
        ticker: 'ADA',
        img: '/images/home/cardano-ada-logo.svg?v=023',
    },
    {
        id: 5,
        name: 'Polkadot',
        ticker: 'DOT',
        img: '/images/home/polkadot-new-dot-logo.svg?v=023',
    },
    {
        id: 6,
        name: 'Polygon',
        ticker: 'MATIC',
        img: '/images/home/polygon-matic-logo.svg?v=023',
    },
    {
        id: 7,
        name: 'Dogecoin',
        ticker: 'DOGE',
        img: '/images/home/dogecoin-doge-logo.svg?v=023',
    },
    {
        id: 8,
        name: 'Cosmos',
        ticker: 'ATOM',
        img: '/images/home/cosmos-atom-logo.svg?v=023',
    },
    {
        id: 9,
        name: 'Avalanche',
        ticker: 'AVAX',
        img: '/images/home/avalanche-avax-logo.svg?v=023',
    },
]

interface AllowedAssets {
    id:number
    name: Asset
    img: string
}

export const allowedAssets: AllowedAssets[] = [
    {
        id:0,
        name: 'USDT',
        img: '/images/earn/usdt_logo.svg',
    },
    {
        id:1,
        name: 'USDC',
        img: '/images/earn/usdc_logo.svg',
    },
]

export const allowedTimeframes: Timeframe[] = [
    { name: '5m', value: 5 * 60 },
    { name: '15m', value: 15 * 60 },
    { name: '30m', value: 30 * 60 },
    { name: '1h', value: 60 * 60 },
    { name: '4h', value: 4 * 60 * 60 },
    { name: '24h', value: 24 * 60 * 60 },
]
export const regexEthAddress = /(0x[A-Fa-f0-9]{40})/g
