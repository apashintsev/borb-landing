import styled from 'styled-components'
import { ReactComponent as InfoIcon } from '../../assets/info-icon.svg'
import { ReactComponent as USDCIcon } from '../../assets/usdc-icon.svg'
import { ReactComponent as Arrow } from '../../assets/arrow-down-icon.svg'
import { Faq } from '../../components/Faq'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useEffect, useRef, useState } from 'react'
import { SelectBody } from '../HomePage'
import { useOnClickOutside } from '../../lib/useOnClickOutside'
import { allowedAssets } from '../../lib/data'
import { useWeb3Context } from '../../context/Web3Context'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { BorbGame__factory } from '../../@types/contracts/BorbGame__factory'
import { gameSlice } from '../../store/reducers/gameSlice'
import { ethers } from 'ethers'
import { ERC20Token__factory } from '../../@types/contracts/ERC20Token__factory'
import { SelectAsset } from '../HomePage/components/SelectAsset'

type ActiveTab = 'Supply' | 'Withdraw'
const SupplyPage = () => {
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [popup, setPopup] = useState(false)
    const [itemId, setItemId] = useState(0)
    const reff = useRef(null)
    useOnClickOutside(reff, () => setPopup(false))
    //==
    const [activeTabName, setActiveTabName] = useState<ActiveTab>('Supply')
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
    useEffect(() => {
        // Using an IIFE
        ;(async function anyNameFunction() {
            if (!web3Provider) return

            const gameContract = BorbGame__factory.connect(
                gameContractAddress,
                web3Provider!
            )
            try {
                const assetAddress = await gameContract.getAssetAddress(asset)
                dispatch(setAssetContract(assetAddress))
                if (
                    assetAddress !== ethers.constants.AddressZero &&
                    !!address
                ) {
                    await updateBalance(assetAddress)
                }
            } catch (e: any) {
                console.error(e)
            }
        })()
    }, [asset, address])

    async function updateBalance(assetAddress: string) {
        const assetContract = ERC20Token__factory.connect(
            assetAddress,
            web3Provider!
        )
        const balance = await assetContract.balanceOf(address!)
        dispatch(setUserBalance(balance))
    }
    //==
    return (
        <StyledSupply>
            <div className="container">
                <Title>Supply crypto and earn interest</Title>
                <Subtitle>
                    Supply your tokens and get Token+ while earning interest
                </Subtitle>
                <TabContainer>
                    <Tab
                        active={activeTabName === 'Supply'}
                        onClick={() => setActiveTabName('Supply')}
                    >
                        <span>Supply</span>
                    </Tab>
                    <Tab
                        active={activeTabName === 'Withdraw'}
                        onClick={() => setActiveTabName('Withdraw')}
                    >
                        <span>Withdraw</span>
                    </Tab>
                </TabContainer>
                <InputContainer>
                    <InputWrapper>
                        <TitleContainer>
                            <SettingsTitle margin="9px">
                                {activeTabName}
                            </SettingsTitle>
                            {isMobile && (
                                <SettingsTitle>{`Balance: ${userBalance}`}</SettingsTitle>
                            )}
                        </TitleContainer>
                        <div className="input-wrapper">
                            <SelectAsset />

                            <input
                                type="number"
                                className="input"
                                placeholder="Amount"
                            />
                        </div>
                    </InputWrapper>
                    <InputWrapper disabled>
                        <SettingsTitle margin="9px">Receive</SettingsTitle>

                        <div className="input-wrapper">
                            <SelectWrapper>
                                <CurrencyWrapper>
                                    <img src={assetImg} alt={asset} />
                                </CurrencyWrapper>
                                <span>{`${asset}+`}</span>
                            </SelectWrapper>
                            <input
                                type="number"
                                className="input"
                                disabled
                                value={0}
                            />
                        </div>
                    </InputWrapper>
                </InputContainer>
                {!isMobile && (
                    <SettingsTitle margin="24px">
                        {`Balance: ${userBalance}`}
                    </SettingsTitle>
                )}
                <Btn>Supply {asset}</Btn>
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
                    </PurchaseDataList>
                    <PurchaseDataList>
                        <PurchaseDataItem>
                            <SettingsTitle>
                                1 {asset}=1 {asset}+
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

    border-bottom: ${(props) =>
        props.active ? '2px solid #3fe7be' : '2px solid transparent'};

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

export const SettingsTitle = styled.span<{ margin?: string }>`
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    margin-bottom: ${(props) => props.margin ?? '0px'};
    color: #8a8f99;
    display: flex;

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
        border: ${({ disabled, theme }) =>
            disabled
                ? `1px solid ${theme.inputDisabledBorderColor}`
                : `1px solid ${theme.inputBorderColor}`};

        border-radius: 8px;
        padding: 12px;
        display: flex;

        background-color: ${({ disabled, theme }) =>
            disabled
                ? theme.inputWrapperDisabledColor
                : theme.inputWrapperColor};

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
