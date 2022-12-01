import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    Asset,
    CurrencyTicker,
    Timeframe,
} from '../../@types/Game/game'
import { allowedAssets, allowedCurrencies } from '../../lib/data'

export const initialState = {
    selectedAsset: 'USDT' as Asset,
    selectedAssetImg: '/images/earn/usdt_logo.svg' as string,
    selectedAssetGameContract: process.env
        .REACT_APP_USDT_GAME_CONTRACT! as string,
    selectedAssetPoolContract: process.env
        .REACT_APP_USDT_POOL_CONTRACT! as string,
    selectedAssetUSDContract: process.env.REACT_APP_USDT_CONTRACT! as string,
    currentRewardPercent: 86,
    selectedTimeframe: '5m' as Timeframe,
    selectedCurrencyTicker: 'BTC' as CurrencyTicker,
    selectedCurrencyImg: '/images/home/bitcoin.svg' as string,
    selectedCurrencyPrice: 25000 as number,
}
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        changeAsset(state, action: PayloadAction<Asset>) {
            state.selectedAsset = action.payload
            state.selectedAssetImg = allowedAssets.find(
                (x) => x.name === action.payload
            )?.img!
            if (action.payload === 'USDT') {
                state.selectedAssetUSDContract =
                    process.env.REACT_APP_USDT_CONTRACT!
                state.selectedAssetGameContract =
                    process.env.REACT_APP_USDT_GAME_CONTRACT!
                state.selectedAssetPoolContract =
                    process.env.REACT_APP_USDT_POOL_CONTRACT!
            } else {
                state.selectedAssetUSDContract =
                    process.env.REACT_APP_USDC_CONTRACT!
                state.selectedAssetGameContract =
                    process.env.REACT_APP_USDC_GAME_CONTRACT!
                state.selectedAssetPoolContract =
                    process.env.REACT_APP_USDC_POOL_CONTRACT!
            }
        },
        setRewardPercent(state, action: PayloadAction<number>) {
            state.currentRewardPercent = action.payload
        },
        setTimeframe(state, action: PayloadAction<Timeframe>) {
            state.selectedTimeframe = action.payload
        },
        setCurrency(state, action: PayloadAction<CurrencyTicker>) {
            state.selectedCurrencyTicker = action.payload
            state.selectedCurrencyImg = allowedCurrencies.find(
                (x) => x.ticker === action.payload
            )?.img!
        },
        setCurrencyPrice(state, action: PayloadAction<number>) {
            state.selectedCurrencyPrice = action.payload
        } /*
        setNetwork(
            state,
            action: PayloadAction<{ network: Web3ProviderState['network'] }>
        ) {
            state.network = action.payload.network
        },
        resetWeb3Provider(state) {},*/,
    },
})

export default gameSlice.reducer
