import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosError } from "axios"
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
export const getActiveBets = createAsyncThunk<ApiResponse<ListResponse<BetVm>>, IBetsRequest>('history/getActiveBets', async (args, {rejectWithValue} ) => {
    try {
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
    } catch (err: any) {
        return rejectWithValue(err.response.data)
    }
})

export const getClosedBets = createAsyncThunk<ApiResponse<ListResponse<BetVm>>, IBetsRequest>(
    'history/getClosedBets',
    async (args, { rejectWithValue }) => {
        try {
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
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)
