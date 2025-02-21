import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BigNumber, ethers } from 'ethers'

export const initialState = {
    assetTokenPlusContractAddress: ethers.constants.AddressZero,
    tokenPlusBalance: BigNumber.from(0),
    buyPrice: BigNumber.from(ethers.utils.parseUnits('100', 6)),
    sellPrice: BigNumber.from(ethers.utils.parseUnits('100', 6)),
}
export const supplySlice = createSlice({
    name: 'supply',
    initialState,
    reducers: {
        setAssetTokenPlusContract(state, action: PayloadAction<string>) {
            state.assetTokenPlusContractAddress = action.payload
        },
        setTokenPlusBalance(state, action: PayloadAction<BigNumber>) {
            state.tokenPlusBalance = action.payload
        },
        setBuyPrice(state, action: PayloadAction<BigNumber>) {
            state.buyPrice = action.payload
        },
        setSellPrice(state, action: PayloadAction<BigNumber>) {
            state.sellPrice = action.payload
        },
    },
})

export default supplySlice.reducer
