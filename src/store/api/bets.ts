import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ApiResult } from '../../@types/ApiResponse'
import { BetVm } from '../../@types/Game/bet'
import { ListResponse } from '../../@types/ListResponse'

interface IBetsRequest {
    asset: string
    address: string
    timeframe: number
    pageNumber: number
    pageSize?: number
}

export const betsApi = createApi({
    reducerPath: 'api/bets',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BACKEND_URI! + '/api',
    }),
    endpoints: (build) => ({
        getActive: build.query<ListResponse<BetVm>, IBetsRequest>({
            query: ({ asset, address, timeframe, pageNumber, pageSize=10 }) => ({
                url: 'bets/getActive',
                params: {
                    asset,
                    address,
                    timeframe,
                    pageNumber,
                    pageSize,
                },
            }),
            //`bets/getActive?asset=${asset}&address=${address}&timeframe=${timeframe}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        }),
        getClosed: build.query<ListResponse<BetVm>, IBetsRequest>({
            query: ({ asset, address, timeframe, pageNumber, pageSize=10 }) =>
                `bets/getClosed?asset=${asset}&address=${address}&timeframe=${timeframe}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        }),
        getUncollected: build.query<
            ApiResult<ListResponse<BetVm>>,
            IBetsRequest
        >({
            query: ({ asset, address, timeframe, pageNumber, pageSize=10 }) =>
                `bets/getUncollected?asset=${asset}&address=${address}&timeframe=${timeframe}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
        }),
    }),
})
