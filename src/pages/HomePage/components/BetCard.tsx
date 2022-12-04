import * as React from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import {
    allowedAssets,
    allowedCurrencies,
    allowedTimeframes,
    allowedTimeframesInSeconds,
} from '../../../lib/data'
import { gameSlice } from '../../../store/reducers/gameSlice'
import { CurrencyWrapper, InputWrapper, SelectWrapper } from '../../SupplyPage'
import {
    Button,
    Buttons,
    Card,
    Counter,
    Grid,
    HelperRow,
    Right,
    Text,
} from './main'
import { v4 as uuidv4 } from 'uuid'
import { useWeb3Context } from '../../../context/Web3Context'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { BorbGame__factory } from '../../../@types/contracts/BorbGame__factory'
import { ERC20Token__factory } from '../../../@types/contracts/ERC20Token__factory'
import { ethers } from 'ethers'
import { getParsedEthersError } from '@enzoferey/ethers-error-parser'

const BetTypeUP = 0
const BetTypeDown = 1
export type BetType = 0 | 1

const ERROR_CODE_TX_REJECTED_BY_USER = 4001

export function BetCard() {
    const { web3Provider, address } = useWeb3Context()
    const {
        ref,
        asset,
        assetImg,
        currentRewardPercent,
        gameContractAddress,
        assetContractAddress,
        poolContractAddress,
        userBalance,
        selectedTimeframe,
        currencyTicker,
    } = useAppSelector((state) => state.gameSlice)
    const { setAsset, setAssetContract, setUserBalance } = gameSlice.actions
    const dispatch = useAppDispatch()

    const [show, setShow] = React.useState<boolean>(false)
    const [popup, setPopup] = React.useState<boolean>(false)
    let ref2 = React.useRef(null)
    const [amount, setAmount] = React.useState<number>(0)

    useEffect(() => {
        // Using an IIFE
        ;(async function anyNameFunction() {
            const gameContract = BorbGame__factory.connect(
                gameContractAddress,
                web3Provider!
            )
            try {
                const assetAddress = await gameContract.getAssetAddress(asset)
                console.log({ assetAddress })
                dispatch(setAssetContract(assetAddress))
                if (
                    assetAddress !== ethers.constants.AddressZero &&
                    !!address
                ) {
                    const assetContract = ERC20Token__factory.connect(
                        assetAddress,
                        web3Provider!
                    )
                    const balance = await assetContract.balanceOf(address)
                    console.log({ balance })
                    dispatch(setUserBalance(balance))
                }
            } catch (e: any) {
                console.error(e)
            }
        })()
    }, [asset, address])

    async function setBet(percent: number) {
        let newBetValue = userBalance.gt(1000 * 10 ** 6)
            ? 1000 * 10 ** 6
            : userBalance
        if (percent !== 0) {
            newBetValue = userBalance.div(100).mul(percent)
        }
        setAmount(Number.parseFloat(ethers.utils.formatUnits(newBetValue, 6)))
    }

    async function makeBet(betType: BetType) {
        if (!address) {
            toast.info('Please connect wallet')
        }
        const gameContract = BorbGame__factory.connect(
            gameContractAddress,
            web3Provider!
        )
        try {
            if (await isAllowed(amount)) {
                console.log('args')
                console.log(ethers.utils.parseUnits(amount.toString(), 6))
                console.log(ref)
                console.log(allowedTimeframes.indexOf(selectedTimeframe))
                console.log(betType)
                console.log(
                    allowedCurrencies.indexOf(
                        allowedCurrencies.find(
                            (x) => x.ticker === currencyTicker
                        )!
                    )
                )
                const timeframe =
                    allowedTimeframesInSeconds[
                        allowedTimeframes.indexOf(selectedTimeframe)
                    ]
                console.log({ timeframe })
                const result = await gameContract
                    .connect(web3Provider!.getSigner())
                    .makeBet(
                        ethers.utils.parseUnits(amount.toString(), 6),
                        ref,
                        timeframe,
                        allowedAssets.indexOf(
                            allowedAssets.find((x) => x.name === asset)!
                        ),
                        betType,
                        allowedCurrencies.indexOf(
                            allowedCurrencies.find(
                                (x) => x.ticker === currencyTicker
                            )!
                        )
                    )
                toast.info('Wait for transaction...')
                await result.wait()

                toast.success(`Bet added`)
                //TODO refresh balances
            } else {
                await increaseAllowance()
            }
        } catch (error: any) {
            console.log({ error })
            console.log('=========================================')
            const parsedEthersError = getParsedEthersError(error)
            console.log({ parsedEthersError })
            //console.log(JSON.stringify(error))
            //console.log(JSON.stringify(error.topics))
            //console.log(JSON.stringify(error.data))

            if (error.code === ERROR_CODE_TX_REJECTED_BY_USER) {
                toast.info('TX_REJECTED_BY_USER')
                return
            } else {
                toast.error(error.message)
            }
            // @ts-ignore
            //const revertData = error.data

            //const decodedError = gameContract.interface.parseError(error.data.data)

            console.log(`Transaction failed:`)
            //console.log({ decodedError })
        }
    }

    async function increaseAllowance() {
        const assetContract = ERC20Token__factory.connect(
            assetContractAddress,
            web3Provider!
        )

        const result = await assetContract
            .connect(web3Provider!.getSigner())
            .approve(poolContractAddress, ethers.constants.MaxUint256)
        toast.info('Wait for transaction...')
        await result.wait()

        toast.success(`Allowance increased`)
    }

    async function isAllowed(amount: number): Promise<boolean> {
        if (!!address && !!assetContractAddress) {
            try {
                const assetContract = ERC20Token__factory.connect(
                    assetContractAddress,
                    web3Provider!
                )
                const result = await assetContract.allowance(
                    address,
                    poolContractAddress
                )
                return result.toBigInt() >= amount
            } catch (e: any) {
                console.log(e)
                toast.error(e.message)
            }
        }
        return false
    }

    return (
        <Right>
            <div className="content">
                <Counter>{currentRewardPercent}%</Counter>
                <InputWrapper>
                    <div className="input-wrapper">
                        <SelectWrapper
                            onClick={() => {
                                setPopup(true)
                            }}
                        >
                            <CurrencyWrapper>
                                <img src={assetImg} alt={asset} />
                            </CurrencyWrapper>
                            <span>{asset}</span>
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="arrow"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M8 10L5 6L11 6L8 10Z" fill="#23272B" />
                            </svg>
                        </SelectWrapper>
                        {popup && (
                            <SelectBody ref={ref2}>
                                {allowedAssets.map((item) => (
                                    <div
                                        key={uuidv4()}
                                        className="select_card"
                                        onClick={() => {
                                            dispatch(setAsset(item.name))
                                            setPopup(false)
                                        }}
                                    >
                                        <img src={item.img} alt={item.name} />
                                        <p>{item.name}</p>
                                    </div>
                                ))}
                            </SelectBody>
                        )}

                        <input
                            type="number"
                            className="input"
                            placeholder="Amount"
                            value={amount}
                            onChange={(e) =>
                                setAmount(Number.parseFloat(e.target.value))
                            }
                        />
                    </div>
                </InputWrapper>
                <HelperRow>
                    <Text>
                        Balance: {ethers.utils.formatUnits(userBalance, 6)}
                    </Text>
                    <Text>
                        ${amount + (amount / 100) * currentRewardPercent} payout
                    </Text>
                </HelperRow>
                <Grid>
                    <Card onClick={() => setBet(10)}>10%</Card>
                    <Card onClick={() => setBet(25)}>25%</Card>
                    <Card onClick={() => setBet(50)}>50%</Card>
                    <Card onClick={() => setBet(75)}>75%</Card>
                    <Card onClick={() => setBet(0)}>Max</Card>
                </Grid>
                <Buttons>
                    <Button onClick={() => makeBet(BetTypeUP)}>
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M16 12L22 20H10L16 12Z" fill="#238069" />
                        </svg>
                    </Button>
                    <Button red onClick={() => makeBet(BetTypeDown)}>
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 20L10 12L22 12L16 20Z"
                                fill="#8C3045"
                            />
                        </svg>
                    </Button>
                </Buttons>
            </div>
        </Right>
    )
}

export const SelectBody = styled.div`
    position: absolute;
    z-index: 111;
    left: 8px;
    top: 45px;
    width: 150px;
    padding: 16px 0;
    background: ${(props) => props.theme.navbarBg};
    border-radius: 8px;
    box-shadow: 0 5px 20px rgb(0 0 0 / 25%);
    .select_card {
        display: flex;
        align-items: center;
        padding: 8px 16px;
        cursor: pointer;

        img {
            width: 20px;
            height: 20px;
        }

        p {
            color: ${(props) => props.theme.arrowBackgroundColor};
            margin-left: 16px;
            text-transform: uppercase;
            font-size: 16px;
        }
        &:hover {
            background: ${(props) => props.theme.selectColor};
            p {
                color: ${(props) => props.theme.navbarBg};
            }
        }
    }
`
