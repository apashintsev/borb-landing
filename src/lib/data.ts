import { Asset, CurrencyTicker, Timeframe } from '../@types/Game/game'

interface AllowedCurrencies {
    name: string
    ticker: CurrencyTicker
    img: string
}

export let allowedCurrencies: AllowedCurrencies[] = [
    {
        name: 'Bitcoin',
        ticker: 'BTC',
        img: '/images/home/bitcoin.svg',
    },
    {
        name: 'Ethereum',
        ticker: 'ETH',
        img: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=023',
    },
    {
        name: 'Solana',
        ticker: 'SOL',
        img: 'https://bitbill.oss-accelerate.aliyuncs.com/pics/coins/solana-plain.svg',
    },
    {
        name: 'BNB',
        ticker: 'BNB',
        img: 'https://cryptologos.cc/logos/bnb-bnb-logo.svg?v=023',
    },
    {
        name: 'Cardano',
        ticker: 'ADA',
        img: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=023',
    },
    {
        name: 'Polkadot',
        ticker: 'DOT',
        img: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=023',
    },
    {
        name: 'Polygon',
        ticker: 'MATIC',
        img: 'https://cryptologos.cc/logos/polygon-matic-logo.svg?v=023',
    },
    {
        name: 'Dogecoin',
        ticker: 'DOGE',
        img: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=023',
    },
    {
        name: 'Cosmos',
        ticker: 'ATOM',
        img: 'https://cryptologos.cc/logos/cosmos-atom-logo.svg?v=023',
    },
    {
        name: 'Avalanche',
        ticker: 'AVAX',
        img: 'https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=023',
    },
]

interface AllowedAssets {
    name: Asset
    img: string
}

export const allowedAssets: AllowedAssets[] = [
    {
        name: 'USDT',
        img: '/images/earn/usdt_logo.svg',
    },
    {
        name: 'USDC',
        img: '/images/earn/usdc_logo.svg',
    },
]

export const allowedTimeframes: Timeframe[] = [
    '5m',
    '15m',
    '30m',
    '1h',
    '4h',
    '24h',
]
export const allowedTimeframesInSeconds: number[] = [
    5 * 60,
    15 * 60,
    30 * 60,
    60 * 60,
    4 * 60 * 60,
    24 * 60 * 60,
]

export const regexEthAddress = /(0x[A-Fa-f0-9]{40})/g
