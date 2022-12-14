import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiResult } from '../../@types/ApiResponse'
import { BetVm } from '../../@types/Game/bet'
import { ListResponse } from '../../@types/ListResponse'
import { getActiveBets, getClosedBets } from '../api/bets'

interface IBetsList {
    bets: BetVm[]
    count: number
    hasNext: boolean
    hasPrevious: boolean
    isLoading:boolean
}

export const initialState = {
    activeBets: {} as IBetsList /*[] as BetVm[],
    activeBetsCount: 0,
    activeBetsHasNext: false,
    activeBetsHasPrevious: false,*/,

    closedBets: {} as IBetsList /*[] as BetVm[],
    closedBetsCount: 0,
    closedBetsHasNext: false,
    closedBetsHasPrevious: false,*/,
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
       
    },
    extraReducers: {
        [getActiveBets.pending.type]: (state) => {
            state.activeBets.isLoading=true
        },
        [getActiveBets.fulfilled.type]: (state, action: PayloadAction<ApiResult<ListResponse<BetVm>>>) => {
            const { data, totalCount, hasNext, hasPrevious } = action.payload.payload
            state.activeBets.bets = data
            state.activeBets.count = totalCount
            state.activeBets.hasNext = hasNext
            state.activeBets.hasPrevious = hasPrevious
            state.activeBets.isLoading = false
        },
        [getActiveBets.rejected.type]: (state, action: PayloadAction<any>) => {
            console.log('rej')
        },
        [getClosedBets.pending.type]: (state) => {
            state.closedBets.isLoading = true
        },
        [getClosedBets.fulfilled.type]: (state, action: PayloadAction<ApiResult<ListResponse<BetVm>>>) => {
            const { data, totalCount, hasNext, hasPrevious } = action.payload.payload
            state.closedBets.bets = data
            state.closedBets.count = totalCount
            state.closedBets.hasNext = hasNext
            state.closedBets.hasPrevious = hasPrevious
            state.closedBets.isLoading=false
        },
        [getClosedBets.rejected.type]: (state, action: PayloadAction<any>) => {
            console.log('rej')
        },
    },
})

export default historySlice.reducer
