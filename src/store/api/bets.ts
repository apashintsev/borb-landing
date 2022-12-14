import { createAsyncThunk } from "@reduxjs/toolkit"
import { ApiResponse } from "../../@types/ApiResponse"
import { BetVm } from "../../@types/Game/bet"
import { ListResponse } from "../../@types/ListResponse"
import { axiosClient } from "./axiosClient"

interface IBetsRequest {
    asset: string
    address: string
    timeframe: number
    pageNumber: number
    pageSize?: number
}
export const getActiveBets = createAsyncThunk<ApiResponse<ListResponse<BetVm>>, IBetsRequest>('history/getActiveBets', async (args, thunkAPI) => {
    const response = await axiosClient.get<ApiResponse<ListResponse<BetVm>>>('/api/bets/getActive', {
        params: {
            asset: args.asset,
            address: args.address,
            timeframe: args.timeframe,
            pageNumber: args.pageNumber,
            pageSize: args.pageSize ?? 2,
        },
    })
    return response.data
})

export const getClosedBets = createAsyncThunk<ApiResponse<ListResponse<BetVm>>, IBetsRequest>('history/getClosedBets', async (args, thunkAPI) => {
    const response = await axiosClient.get<ApiResponse<ListResponse<BetVm>>>('/api/bets/getClosed', {
        params: {
            asset: args.asset,
            address: args.address,
            timeframe: args.timeframe,
            pageNumber: args.pageNumber,
            pageSize: args.pageSize ?? 2,
        },
    })
    return response.data
})
