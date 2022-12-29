import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiResult } from '../../@types/ApiResponse'
import { CurrencyTicker } from '../../@types/Game/game'
import { ListResponse } from '../../@types/ListResponse'
import { allowedCurrencies } from '../../lib/data'
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
    points: {} as IPointsList,

}
export const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {

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

export default pointsSlice.reducer
