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
    isLoading: boolean
    toggleRefresh: boolean
    errors:string[]
}

export const initialState = {
    activeBets: {} as IBetsList,
    closedBets: {} as IBetsList,
}

export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        refreshActiveBets(state) {
            state.activeBets.toggleRefresh = !state.activeBets.toggleRefresh
        },
        refreshClosedBets(state) {
            state.closedBets.toggleRefresh = !state.closedBets.toggleRefresh
        },
    },
    extraReducers: {
        [getActiveBets.pending.type]: (state) => {
            state.activeBets.isLoading = true
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
            state.activeBets.errors=[...action.payload.Errors]
            state.activeBets.isLoading = false
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
            state.closedBets.isLoading = false
        },
        [getClosedBets.rejected.type]: (state, action: PayloadAction<any>) => {
           state.closedBets.isLoading=false
        },
    },
})

export default historySlice.reducer
