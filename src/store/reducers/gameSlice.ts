import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BigNumber, ethers } from 'ethers'
import { ApiResult } from '../../@types/ApiResponse'
import { BetVm } from '../../@types/Game/bet'
import { AssetTicker, CurrencyTicker, TimeframeName } from '../../@types/Game/game'
import { ListResponse } from '../../@types/ListResponse'
import { allowedAssets, allowedCurrencies, allowedTimeframes } from '../../lib/data'
import { getPoints, IPriceVM } from '../api/prices'

interface IPointsList {
    currentPage: number,
    pointsList: IPriceVM[],
    hasNext: boolean,
    hasPrevious: boolean,
    pageSize: number,
    totalCount: number,
    totalPages: number,
    isLoading: boolean
    toggleRefresh: boolean
    errors: string[]
}

export const initialState = {
    ref: ethers.constants.AddressZero,
    asset: allowedAssets[0],
    userBalance: BigNumber.from(0),
    gameContractAddress: process.env.REACT_APP_GAME_CONTRACT!,
    poolContractAddress: process.env.REACT_APP_POOL_CONTRACT!,
    assetContractAddress: ethers.constants.AddressZero,
    rewardPercent: 86,
    timeframe: allowedTimeframes[0],
    currency: allowedCurrencies[0],
    currencyPrice: 25000 as number,
    isPopupOpen: false,
    closedBet: {} as BetVm,
    points: {} as IPointsList
}
export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setAsset(state, action: PayloadAction<AssetTicker>) {
            state.asset = allowedAssets.find((x) => x.name === action.payload) ?? allowedAssets[0]
        },
        setAssetContract(state, action: PayloadAction<string>) {
            state.assetContractAddress = action.payload
        },
        setUserBalance(state, action: PayloadAction<BigNumber>) {
            state.userBalance = action.payload
        },
        setRewardPercent(state, action: PayloadAction<number>) {
            state.rewardPercent = action.payload
        },
        setTimeframe(state, action: PayloadAction<TimeframeName>) {
            state.timeframe = allowedTimeframes.find((x) => x.name === action.payload)!
        },
        setCurrency(state, action: PayloadAction<CurrencyTicker>) {
            state.currency = allowedCurrencies.find((x) => x.ticker === action.payload) ?? allowedCurrencies[0]
        },
        setCurrencyPrice(state, action: PayloadAction<number>) {
            state.currencyPrice = action.payload
        },
        setRef(state, action: PayloadAction<string>) {
            state.ref = action.payload
        },
        setIsPopupOpen(state, action: PayloadAction<boolean>) {
            state.isPopupOpen = action.payload
        },
        setClosedBet(state, action: PayloadAction<BetVm>) {
            state.closedBet = action.payload
        },
    },
    extraReducers: {
        [getPoints.pending.type]: (state) => {
            state.points.isLoading = true
        },
        [getPoints.fulfilled.type]: (state, action: PayloadAction<ApiResult<ListResponse<IPriceVM>>>) => {
            const { currentPage, data, totalCount, hasNext, hasPrevious, pageSize, totalPages } = action.payload.payload
            state.points.currentPage = currentPage
            state.points.pointsList = data
            state.points.hasNext = hasNext
            state.points.hasPrevious = hasPrevious
            state.points.pageSize = pageSize
            state.points.totalCount = totalCount
            state.points.totalPages = totalPages
            state.points.isLoading = false

        },
        [getPoints.rejected.type]: (state, action: PayloadAction<any>) => {
            state.points.errors = [...action.payload.Errors]
            state.points.isLoading = false
        },
    },
})

export default gameSlice.reducer
