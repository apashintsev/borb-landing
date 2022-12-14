import styled from 'styled-components'
import { ReactComponent as InfoIcon } from '../../assets/info-icon.svg'
import { ReactComponent as Arrow } from '../../assets/arrow-down-icon.svg'
import { Faq } from '../../components/Faq'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useEffect, useRef, useState } from 'react'
import { useOnClickOutside } from '../../lib/useOnClickOutside'
import { useWeb3Context } from '../../context/Web3Context'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { BorbGame__factory } from '../../@types/contracts/BorbGame__factory'
import { gameSlice } from '../../store/reducers/gameSlice'
import { ethers } from 'ethers'
import { SelectAsset } from '../HomePage/components/SelectAsset'
import { Pool__factory } from '../../@types/contracts/Pool__factory'
import { getBalance, increaseAllowance, isAllowed } from '../../store/api/contracts'
import { supplySlice } from '../../store/reducers/supplySlice'
import { allowedAssets } from '../../lib/data'
import { toast } from 'react-toastify'
import { getParsedEthersError } from '@enzoferey/ethers-error-parser'

type ActiveTab = 'Supply' | 'Withdraw'
const ERROR_CODE_TX_REJECTED_BY_USER = 4001

const SupplyPage = () => {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [amount, setAmount] = useState<number>(0)
    const [amountTokenPlus, setAmountTokenPlus] = useState<number>(0)
    const [activeTabName, setActiveTabName] = useState<ActiveTab>('Supply')

    const { web3Provider, address } = useWeb3Context()
    const { asset, gameContractAddress, assetContractAddress, poolContractAddress, userBalance } = useAppSelector((state) => state.gameSlice)
    const { assetTokenPlusContractAddress, tokenPlusBalance, buyPrice, sellPrice } = useAppSelector((state1) => state1.supplySlice)
    const { setAssetContract, setUserBalance } = gameSlice.actions
    const { setAssetTokenPlusContract, setBuyPrice, setSellPrice, setTokenPlusBalance } = supplySlice.actions
    const dispatch = useAppDispatch()
    const [reload, setReload] = useState<number>(0)
    const exchangeRate = Number.parseFloat(ethers.utils.formatUnits(activeTabName === 'Supply' ? buyPrice : sellPrice, 6)) / 100

    useEffect(() => {
        // Using an IIFE
        ;(async function anyNameFunction() {
            if (!web3Provider) return

            const gameContract = BorbGame__factory.connect(gameContractAddress, web3Provider!)
            const poolContract = Pool__factory.connect(poolContractAddress, web3Provider!)
            try {
                const assetAddress = await gameContract.getAssetAddress(asset.name)
                dispatch(setAssetContract(assetAddress))
                const tokenPlusAddress = await poolContract.getAssetTokenPlusAddress(asset.name)
                dispatch(setAssetTokenPlusContract(tokenPlusAddress))
                if (assetAddress !== ethers.constants.AddressZero && tokenPlusAddress !== ethers.constants.AddressZero && !!address) {
                    dispatch(setUserBalance(await getBalance(assetAddress!, address!, web3Provider!)))

                    dispatch(setTokenPlusBalance(await getBalance(tokenPlusAddress!, address!, web3Provider!)))

                    dispatch(setBuyPrice(await poolContract.getTokenPlusBuyPrice(asset.id)))

                    dispatch(setSellPrice(await poolContract.getTokenPlusSellPrice(asset.id)))
                }
            } catch (e: any) {
                console.error(e)
            }
        })()
    }, [asset, address, reload])

    async function setInputValue(value: number) {
        try {
            const balance = activeTabName === 'Supply' ? userBalance : tokenPlusBalance
            let newBetValue = ethers.utils.parseUnits(value.toString(), 6)
            if (value > Number.parseFloat(ethers.utils.formatUnits(balance, 6))) {
                newBetValue = balance
            }
            const valueN = Math.abs(Number.parseFloat(ethers.utils.formatUnits(newBetValue, 6)))
            setAmount(valueN)
            setAmountTokenPlus(valueN * exchangeRate)
        } catch {
            clearAmounts()
        }
    }

    async function deposit() {
        if (!address) {
            toast.info('Please connect wallet')
        }
        const poolContract = Pool__factory.connect(poolContractAddress, web3Provider!)
        try {
            const formattedAmount = ethers.utils.parseUnits(amount.toString(), 6)
            if (await isAllowed(address!, assetContractAddress!, web3Provider!, formattedAmount, poolContractAddress)) {
                console.log(ethers.utils.parseUnits(amount.toString(), 6).toString())
                const result = await poolContract.connect(web3Provider!.getSigner()).makeDeposit(
                    asset.id,
                    formattedAmount,
                    { gasLimit: 3000000 } //todo это убрать
                )
                toast
                    .promise(result.wait(), {
                        pending: 'Depositing',
                        success: 'Deposit added 👌',
                        error: 'Error 🤯',
                    })
                    .then((_) => setReload((prev) => prev + 1))
            } else {
                await increaseAllowance(assetContractAddress, web3Provider!, poolContractAddress)
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

    async function withdraw() {
        if (!address) {
            toast.info('Please connect wallet')
        }
        const poolContract = Pool__factory.connect(poolContractAddress, web3Provider!)
        try {
            const formattedAmount = ethers.utils.parseUnits(amountTokenPlus.toFixed(6).toString(), 6)
            if (await isAllowed(address!, assetTokenPlusContractAddress, web3Provider!, formattedAmount, poolContractAddress)) {
                const result = await poolContract.connect(web3Provider!.getSigner()).withdraw(
                    asset.id,
                    formattedAmount,
                    { gasLimit: 3000000 } //todo это убрать
                )
                toast
                    .promise(result.wait(), {
                        pending: 'Withdrawing',
                        success: 'Withdrawed 👌',
                        error: 'Error 🤯',
                    })
                    .then((_) => setReload((prev) => prev + 1))
            } else {
                await increaseAllowance(assetTokenPlusContractAddress, web3Provider!, poolContractAddress)
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

    const changeTab = (tabName: ActiveTab) => {
        setActiveTabName(tabName)
        clearAmounts()
    }

    const clearAmounts = () => {
        setAmount(0)
        setAmountTokenPlus(0)
    }

    return (
        <StyledSupply>
            <div className="container">
                <Title>Supply crypto and earn interest</Title>
                <Subtitle>Supply your tokens and get Token+ while earning interest</Subtitle>
                <TabContainer>
                    <Tab active={activeTabName === 'Supply'} onClick={() => changeTab('Supply')}>
                        <span>Supply</span>
                    </Tab>
                    <Tab active={activeTabName === 'Withdraw'} onClick={() => changeTab('Withdraw')}>
                        <span>Withdraw</span>
                    </Tab>
                </TabContainer>
                <InputContainer>
                    <InputWrapper>
                        <TitleContainer>
                            <SettingsTitle margin="9px">{activeTabName}</SettingsTitle>
                            {isMobile && (
                                <SettingsTitle>{`Balance: ${ethers.utils.formatUnits(userBalance, 6)} ${asset.name}; ${ethers.utils.formatUnits(
                                    tokenPlusBalance,
                                    6
                                )} ${asset.name}+`}</SettingsTitle>
                            )}
                        </TitleContainer>
                        <div className="input-wrapper">
                            <SelectAsset />
                            <input
                                type="number"
                                className="input"
                                placeholder="Amount"
                                value={amount}
                                onChange={(e) => setInputValue(Number.parseFloat(e.target.value))}
                            />
                        </div>
                    </InputWrapper>
                    <InputWrapper disabled>
                        <SettingsTitle margin="9px">{activeTabName === 'Supply' ? 'Receive' : 'Send'}</SettingsTitle>

                        <div className="input-wrapper">
                            <SelectWrapper>
                                <CurrencyWrapper>
                                    <img src={asset.img} alt={asset.name} />
                                </CurrencyWrapper>
                                <span>{`${asset.name}+`}</span>
                            </SelectWrapper>
                            <input type="number" className="input" disabled value={amountTokenPlus} />
                        </div>
                    </InputWrapper>
                </InputContainer>
                {!isMobile && (
                    <SettingsTitle>{`Balance: ${ethers.utils.formatUnits(userBalance, 6)} ${asset.name}; ${ethers.utils.formatUnits(tokenPlusBalance, 6)} ${
                        asset.name
                    }+`}</SettingsTitle>
                )}
                <Btn onClick={() => (activeTabName === 'Supply' ? deposit() : withdraw())}>
                    {activeTabName} {asset.name}
                </Btn>
                <PurchaseWrapper>
                    <PurchaseDataList>
                        <PurchaseDataItem>
                            <SettingsTitle>Exchange rate:</SettingsTitle>
                        </PurchaseDataItem>
                        <PurchaseDataItem>
                            <SettingsTitle>Deposit fee:</SettingsTitle>
                        </PurchaseDataItem>
                        <PurchaseDataItem>
                            <SettingsTitle>Projected APY:</SettingsTitle>
                        </PurchaseDataItem>
                        <PurchaseDataItem>
                            <SettingsTitle>{`${asset.name}+ contract:`}</SettingsTitle>
                        </PurchaseDataItem>
                    </PurchaseDataList>
                    <PurchaseDataList>
                        <PurchaseDataItem>
                            <SettingsTitle>
                                1 {asset.name}={exchangeRate} {asset.name}+
                                <InfoIcon />
                            </SettingsTitle>
                        </PurchaseDataItem>
                        <PurchaseDataItem>
                            <SettingsTitle>
                                0%
                                <InfoIcon />
                            </SettingsTitle>
                        </PurchaseDataItem>
                        <PurchaseDataItem>
                            <SettingsTitle>
                                5.79%
                                <InfoIcon />
                            </SettingsTitle>
                        </PurchaseDataItem>
                        <PurchaseDataItem>
                            <SettingsTitle cursorPointer={true} onClick={() => navigator.clipboard.writeText(assetTokenPlusContractAddress)}>
                                {assetTokenPlusContractAddress}
                                <InfoIcon />
                            </SettingsTitle>
                        </PurchaseDataItem>
                    </PurchaseDataList>
                </PurchaseWrapper>
                <Faq />
            </div>
        </StyledSupply>
    )
}

const StyledSupply = styled.div`
    margin-bottom: 60px;
    .input_wrapper {
        position: relative;
    }
    @media screen and (max-width: 768px) {
        margin-bottom: 32px;
    }
`

const Title = styled.h1`
    font-family: 'Inter';
    font-weight: 600;
    font-size: 36px;
    line-height: 140%;
    color: ${(props) => props.theme.titleColor};
    margin-bottom: 4px;

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`

const Subtitle = styled.p`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: ${(props) => props.theme.subtitleColor};
    margin-bottom: 48px;

    @media screen and (max-width: 1000px) {
        margin-bottom: 40px;
    }

    @media screen and (max-width: 480px) {
        margin-bottom: 24px;
    }
`

export const TabContainer = styled.div`
    display: flex;
    position: relative;
    gap: 57px;
    margin-bottom: 30px;
    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${(props) => props.theme.tabBorderColor};
    }
    @media screen and (max-width: 768px) {
        gap: 48px;
    }

    @media screen and (max-width: 480px) {
        gap: 0;
        justify-content: space-between;
    }
`

export const Tab = styled.div<{ active?: boolean }>`
    padding: 8px 4px;
    position: relative;
    cursor: pointer;

    border-bottom: ${(props) => (props.active ? '2px solid #3fe7be' : '2px solid transparent')};

    span {
        color: ${(props) => (props.active ? '#3fe7be' : '#8a8f99')};
        font-weight: ${(props) => (props.active ? '600' : '400')};
        font-size: 14px;
        line-height: 140%;
        font-size: 14px;
        line-height: 140%;
        display: flex;
        align-items: center;
    }
    h3 {
        color: var(--green);
        font-weight: 400;
        font-size: 14px;
        margin-left: 5px;
    }
`

export const SettingsTitle = styled.span<{ margin?: string; cursorPointer?: boolean }>`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    margin-bottom: ${(props) => props.margin ?? '0px'};
    color: #8a8f99;
    display: flex;
    cursor: ${(props) => (props.cursorPointer ? 'pointer' : '	default')};

    svg {
        margin-left: 8px;
        margin-top: 3px;
    }
`

const InputContainer = styled.div`
    gap: 16px;
    display: flex;
    margin-bottom: 12px;

    .title {
        font-family: 'Inter';
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
        margin-bottom: 40px;
    }
`

export const InputWrapper = styled.div<{ disabled?: boolean }>`
    position: relative;
    .wrapper {
        display: flex;
        flex-direction: column;
    }

    .input-wrapper {
        position: relative;
        width: 340px;
        border: 1px solid #e9ecf2;
        border: ${({ disabled, theme }) => (disabled ? `1px solid ${theme.inputDisabledBorderColor}` : `1px solid ${theme.inputBorderColor}`)};

        border-radius: 8px;
        padding: 12px;
        display: flex;

        background-color: ${({ disabled, theme }) => (disabled ? theme.inputWrapperDisabledColor : theme.inputWrapperColor)};

        @media screen and (max-width: 786px) {
            width: 100%;
        }
    }

    .input {
        font-family: 'Inter';
        font-weight: 400;
        font-size: 21px;
        color: ${(props) => props.theme.selectColor};
        text-align: right;
        width: 100%;
        margin-left: auto;
        outline: none;
        &::placeholder {
            font-family: 'Inter';
            font-weight: 400;
            font-size: 21px;
            line-height: 30px;
            color: ${(props) => props.theme.inputPlaceholderColor};
            text-align: right;
        }
    }

    @media screen and (max-width: 786px) {
        width: 100%;
        .input {
            width: 100%;
        }
    }
`

const TitleContainer = styled.div`
    @media screen and (max-width: 768px) {
        display: flex;
        justify-content: space-between;
        width: 340px;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
    }
`

export const SelectWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;

    .colored {
        fill: #fff;
    }
    span {
        font-family: 'Inter';
        font-weight: 400;
        text-transform: uppercase;
        font-size: 14px;
        line-height: 140%;
        color: ${(props) => props.theme.selectColor};
    }
    path {
        fill: ${(props) => props.theme.arrowBackgroundColor};
    }
`

export const CurrencyWrapper = styled.div`
    margin-right: 4px;
    display: flex;
    justify-content: center;
`

const Btn = styled.button`
    background: #3fe7be;
    border-radius: 8px;
    padding: 13px 48px;
    font-family: 'Inter';
    font-weight: 600;
    font-size: 16px;
    line-height: 140%;
    color: #238069;
    align-self: flex-start;
    margin-bottom: 24px;
    transition: 0.2s all ease;
    @media screen and (max-width: 1000px) {
        margin-bottom: 32px;
    }
    @media screen and (max-width: 768px) {
        width: 100%;
    }
    &:hover,
    &:active {
        color: #fff;
    }
`

const PurchaseWrapper = styled.div`
    display: flex;
    gap: 20px;
    margin-bottom: 80px;
`

const PurchaseDataList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 8px;
`
const PurchaseDataItem = styled.li``

const ArrowIcon = styled(Arrow)`
    path {
        fill: ${(props) => props.theme.arrowBackgroundColor};
    }
`

export { SupplyPage }
