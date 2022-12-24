import { BigNumber, ethers } from 'ethers'
import { toast } from 'react-toastify'
import { ERC20Token__factory } from '../../@types/contracts/ERC20Token__factory'

export async function getBalance(assetAddress: string, address: string, web3Provider: ethers.providers.Web3Provider): Promise<BigNumber> {
    const assetContract = ERC20Token__factory.connect(assetAddress, web3Provider!)
    return await assetContract.balanceOf(address)
}

export async function isAllowed(
    address: string,
    assetAddress: string,
    web3Provider: ethers.providers.Web3Provider,
    amount: BigNumber,
    poolContractAddress: string
): Promise<boolean> {
    if (!!address && !!assetAddress) {
        try {
            const assetContract = ERC20Token__factory.connect(assetAddress, web3Provider!)
            const result = await assetContract.allowance(address, poolContractAddress)
            return result.gte(amount)
        } catch (e: any) {
            console.log(e)
            toast.error(e.message)
        }
    }
    return false
}

export async function increaseAllowance(assetAddress: string, web3Provider: ethers.providers.Web3Provider, poolContractAddress: string) {
    const assetContract = ERC20Token__factory.connect(assetAddress, web3Provider!)

    const result = await assetContract.connect(web3Provider!.getSigner()).approve(poolContractAddress, ethers.constants.MaxUint256)

    toast.promise(result.wait(), {
        pending: 'Wait for transaction...',
        success: 'Allowance increased 👌',
        error: 'Error 🤯',
    })
}