import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiResponse } from '../../@types/ApiResponse'
import { ReferalRewardVm } from '../../@types/Game/ref'
import { ListResponse } from '../../@types/ListResponse'
import { axiosClient } from './axiosClient'

interface IReferalRewardsRequest {
    address: string
    pageNumber: number
    pageSize?: number
}

export const getRewards = createAsyncThunk<ApiResponse<ListResponse<ReferalRewardVm>>, IReferalRewardsRequest>(
    'referalRewards/getRewards',
    async (args, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get<ApiResponse<ListResponse<ReferalRewardVm>>>(
                '/api/referalRewards/getRewards',
                {
                    params: {
                        address: args.address,
                        pageNumber: args.pageNumber,
                        pageSize: args.pageSize ?? 2,
                    },
                }
            )
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)