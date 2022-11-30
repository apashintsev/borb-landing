import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ethers } from 'ethers'

export type Web3ProviderState = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    provider: any
    web3Provider: ethers.providers.Web3Provider | null | undefined
    address: string | null | undefined
    network: ethers.providers.Network | null | undefined
    connect: (() => Promise<void>) | null
    disconnect: (() => Promise<void>) | null
}

export const initialState: Web3ProviderState = {
    provider: null,
    web3Provider: null,
    address: null,
    network: null,
    connect: null,
    disconnect: null,
}

export const web3Slice = createSlice({
    name: 'web3',
    initialState,
    reducers: {
        setWeb3Provider(
            state,
            action: PayloadAction<{
                provider: Web3ProviderState['provider']
                web3Provider: Web3ProviderState['web3Provider']
                address: Web3ProviderState['address']
                network: Web3ProviderState['network']
            }>
        ) {
            state.provider = action.payload.provider
            state.web3Provider = action.payload.web3Provider
            state.address = action.payload.address
            state.network = action.payload.network
        },
        setAddress(
            state,
            action: PayloadAction<{ address: Web3ProviderState['address'] }>
        ) {
            state.address = action.payload.address
        },
        setNetwork(
            state,
            action: PayloadAction<{ network: Web3ProviderState['network'] }>
        ) {
            state.network = action.payload.network
        },
        resetWeb3Provider(state) {
            state.provider = null
            state.web3Provider = null
            state.address = null
            state.network = null
        },
    },
})

export default web3Slice.reducer
