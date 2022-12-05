import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ReferalRewardVm } from '../../@types/Game/ref'
import { ListResponse } from '../../@types/ListResponse'

interface IReferalRewardsRequest {
    address: string
    pageNumber: number
    pageSize?: number
}

export const referalApi = createApi({
    reducerPath: 'api/referalrewards',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND_URI! + '/api',
    }),
    endpoints: (build) => ({
        getRewards: build.query<
            ListResponse<ReferalRewardVm>,
            IReferalRewardsRequest
        >({
            query: ({ address, pageNumber, pageSize = 10 }) => ({
                url: 'referalrewards/getrewards',
                params: {
                    address,
                    pageNumber,
                    pageSize,
                },
            }),
        }),
    }),
})
