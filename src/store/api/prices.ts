import { createAsyncThunk } from '@reduxjs/toolkit'
import { ApiResponse } from '../../@types/ApiResponse'
import { ListResponse } from '../../@types/ListResponse'
import { Currency } from '../../lib/data';
import { axiosClient } from './axiosClient'

interface IPriceRequest {
    currency: Currency,
    timeframe: number,
    pageNumber: number,
    pageSize: number,
}

export interface IPriceVM {
    timeStamp: string;
    value: number;
}

export const getPoints = createAsyncThunk<ApiResponse<ListResponse<IPriceVM>>, IPriceRequest>(
    'Prices/GetPoints',
    async (args, { rejectWithValue }) => {
        try {
            const response = await axiosClient.get<ApiResponse<ListResponse<IPriceVM>>>(
                '/api/Prices/GetPoints',
                {
                    params: {
                        currency: args.currency,
                        timeframe: args.timeframe,
                        pageNumber: args.pageNumber,
                        pageSize: args.pageSize,
                    },
                }
            )
            return response.data
        } catch (err: any) {
            return rejectWithValue(err.response.data)
        }
    }
)
