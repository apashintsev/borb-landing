import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiResult } from '../../@types/ApiResponse'
import { ReferalRewardVm } from '../../@types/Game/ref'
import { ListResponse } from '../../@types/ListResponse'
import { getRewards } from '../api/referal'

export const initialState = {
    rewards: [] as ReferalRewardVm[],
    hasNext: false,
    hasPrevious: false,
    isLoading: false,
    errors: [] as string[],
}

export const referalRewardsSlice = createSlice({
    name: 'referalRewards',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getRewards.pending.type]: (state) => {
            state.isLoading = true
        },
        [getRewards.fulfilled.type]: (state, action: PayloadAction<ApiResult<ListResponse<ReferalRewardVm>>>) => {
            const { data, hasNext, hasPrevious } = action.payload.payload
            state.rewards = data
            state.hasNext = hasNext
            state.hasPrevious = hasPrevious
            state.isLoading = false
        },
        [getRewards.rejected.type]: (state, action: PayloadAction<any>) => {
            state.errors = [...action.payload.Errors]
            state.isLoading = false
        },
    },
})

export default referalRewardsSlice.reducer
