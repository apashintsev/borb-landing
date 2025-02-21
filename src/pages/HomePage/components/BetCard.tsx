import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { gameSlice } from '../../../store/reducers/gameSlice'
import { InputWrapper } from '../../SupplyPage'
import { Button, Buttons, Card, Counter, Grid, HelperRow, Right, Text } from './main'
import { useWeb3Context } from '../../../context/Web3Context'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { BorbGame__factory } from '../../../@types/contracts/BorbGame__factory'
import { BigNumber, ethers } from 'ethers'
import { SelectAsset } from '../../../components/SelectAsset/SelectAsset'
import { getBalance, increaseAllowance, isAllowed } from '../../../store/api/contracts'
import { useTranslation } from 'react-i18next'

const BetTypeUP = 0
const BetTypeDown = 1
export type BetType = 0 | 1

const ERROR_CODE_TX_REJECTED_BY_USER = 4001

export function BetCard() {
    const { t } = useTranslation()
    const { web3Provider, address } = useWeb3Context()
    const {
        ref,
        asset,
        rewardPercent,
        gameContractAddress,
        assetContractAddress,
        poolContractAddress,
        userBalance,
        timeframe,
        currency,
    } = useAppSelector((state) => state.gameSlice)
    const { setAssetContract, setUserBalance, setRewardPercent } = gameSlice.actions
    const dispatch = useAppDispatch()
    const [amount, setAmount] = useState<number>(0)
    const [reload, setReload] = useState<number>(0)

    useEffect(() => {
        // Using an IIFE
        ;(async function anyNameFunction() {
            if (!web3Provider) return

            const gameContract = BorbGame__factory.connect(gameContractAddress, web3Provider!)
            try {
                const assetAddress = await gameContract.getAssetAddress(asset.name)
                dispatch(setAssetContract(assetAddress))
                if (assetAddress !== ethers.constants.AddressZero && !!address) {
                    const userBalance = await getBalance(assetAddress!, address!, web3Provider!)
                    dispatch(setUserBalance(userBalance))
                    const rewardPercent = await gameContract.rewardPercent(currency.id, asset.id, timeframe.value)
                    dispatch(setRewardPercent(rewardPercent.toNumber()))
                }
            } catch (e: any) {
                console.error(e)
            }
        })()
    }, [asset, address, reload])

    async function setBetHandler(percent: number) {
        let newBetValue = userBalance.gt(process.env.REACT_APP_MAX_BET!) ? process.env.REACT_APP_MAX_BET! : userBalance
        if (percent !== 0) {
            newBetValue = userBalance.div(100).mul(percent)
        }
        setAmount(Number.parseFloat(ethers.utils.formatUnits(newBetValue, 6)))
    }

    async function setBetValueHandler(value: number) {
        try {
            let newBetValue = ethers.utils.parseUnits(value.toString(), 6)
            if (value > Number.parseFloat(ethers.utils.formatUnits(userBalance, 6))) {
                newBetValue = userBalance.gt(process.env.REACT_APP_MAX_BET!)
                    ? BigNumber.from(process.env.REACT_APP_MAX_BET!)
                    : userBalance
            }
            setAmount(Math.abs(Number.parseFloat(ethers.utils.formatUnits(newBetValue, 6))))
        } catch {
            setAmount(0)
        }
    }

    async function makeBetHandler(betType: BetType) {
        if (!address) {
            toast.info(t('HomePage.Connect wallet'))
        }
        const gameContract = BorbGame__factory.connect(gameContractAddress, web3Provider!)
        try {
            const formattedAmount = ethers.utils.parseUnits(amount.toString(), 6)
            if (await isAllowed(address!, assetContractAddress!, web3Provider!, formattedAmount, poolContractAddress)) {
                const result = await gameContract.connect(web3Provider!.getSigner()).makeBet(
                    formattedAmount,
                    ref,
                    timeframe.value,
                    asset.id,
                    betType,
                    currency.id,
                    { gasLimit: 3000000 } //todo это убрать
                )
                toast
                    .promise(result.wait(), {
                        pending: t<string>('HomePage.Adding bet'),
                        success: t<string>('HomePage.Bet added 👌'),
                        error: t<string>('HomePage.Error 🤯'),
                    })
                    .then((_) => setReload((prev) => prev + 1))
                    .catch((e) => {
                        console.log({ e })
                        const decoded = BorbGame__factory.createInterface().decodeErrorResult(
                            'NotEnoughtPoolBalanceError',
                            e.transaction.data
                        )
                        console.log({ decoded })
                    })
            } else {
                await increaseAllowance(assetContractAddress, web3Provider!, poolContractAddress)
            }
        } catch (error: any) {
            console.log({ error })
            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                toast.info('TX_REJECTED_BY_USER')
                return
            } else {
                const decoded = BorbGame__factory.createInterface().decodeErrorResult('TimeframeNotExsistError', error)
                console.log({ decoded })
                if (error.errorName) {
                    toast.error(t<string>(error.errorName))
                }
                toast.error(error.message)
            }
        }
    }

    return (
        <Right>
            <div className="content">
                <Counter>{rewardPercent}%</Counter>
                <InputWrapper>
                    <div className="input-wrapper">
                        <SelectAsset />
                        <input
                            type="number"
                            className="input"
                            placeholder={t<string>('HomePage.Amount')}
                            value={amount}
                            onChange={(e) => setBetValueHandler(Number.parseFloat(e.target.value))}
                        />
                    </div>
                </InputWrapper>
                <HelperRow>
                    <Text>
                        {t('HomePage.Balance')}: {ethers.utils.formatUnits(userBalance, 6)}
                    </Text>
                    <Text>
                        ${amount + (amount / 100) * rewardPercent} {t('HomePage.payout')}
                    </Text>
                </HelperRow>
                <Grid>
                    <Card onClick={() => setBetHandler(10)}>10%</Card>
                    <Card onClick={() => setBetHandler(25)}>25%</Card>
                    <Card onClick={() => setBetHandler(50)}>50%</Card>
                    <Card onClick={() => setBetHandler(75)}>75%</Card>
                    <Card onClick={() => setBetHandler(0)}>Max</Card>
                </Grid>
                <Buttons>
                    <Button onClick={() => makeBetHandler(BetTypeUP)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 12L22 20H10L16 12Z" fill="#238069" />
                        </svg>
                    </Button>
                    <Button red onClick={() => makeBetHandler(BetTypeDown)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 20L10 12L22 12L16 20Z" fill="#8C3045" />
                        </svg>
                    </Button>
                </Buttons>
            </div>
        </Right>
    )
}
