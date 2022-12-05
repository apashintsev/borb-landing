import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BigNumber, ethers } from 'ethers'
import {
    Asset,
    CurrencyTicker,
    Timeframe,
    TimeframeName,
} from '../../@types/Game/game'
import {
    allowedAssets,
    allowedCurrencies,
    allowedTimeframes,
} from '../../lib/data'

export const initialState = {
    ref: ethers.constants.AddressZero,
    asset: 'USDT' as Asset,
    assetImg: '/images/earn/usdt_logo.svg' as string,
    userBalance: BigNumber.from(0),
    gameContractAddress: process.env.REACT_APP_GAME_CONTRACT! as string,
    poolContractAddress: process.env.REACT_APP_POOL_CONTRACT!,
    assetContractAddress: '' as string,
    currentRewardPercent: 86,
    selectedTimeframe: { name: '5m', value: 300 } as Timeframe,
    currencyTicker: 'BTC' as CurrencyTicker,
    currencyImg: '/images/home/bitcoin.svg' as string,
    currencyPrice: 25000 as number,
    activeBetsCount: 0, //TODO
    closedBetsCount: 0, //TODO
    uncollectedBetsCount: 0, //TODO
}
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setAsset(state, action: PayloadAction<Asset>) {
            state.asset = action.payload
            state.assetImg = allowedAssets.find(
                (x) => x.name === action.payload
            )?.img!
        },
        setAssetContract(state, action: PayloadAction<string>) {
            state.assetContractAddress = action.payload
        },
        setUserBalance(state, action: PayloadAction<BigNumber>) {
            state.userBalance = action.payload
        },
        setRewardPercent(state, action: PayloadAction<number>) {
            state.currentRewardPercent = action.payload
        },
        setTimeframe(state, action: PayloadAction<TimeframeName>) {
            state.selectedTimeframe = allowedTimeframes.find(
                (x) => x.name === action.payload
            )!
        },
        setCurrency(state, action: PayloadAction<CurrencyTicker>) {
            state.currencyTicker = action.payload
            state.currencyImg = allowedCurrencies.find(
                (x) => x.ticker === action.payload
            )?.img!
        },
        setCurrencyPrice(state, action: PayloadAction<number>) {
            state.currencyPrice = action.payload
        },
        setRef(state, action: PayloadAction<string>) {
            state.ref = action.payload
        },
    },
})

export default gameSlice.reducer
