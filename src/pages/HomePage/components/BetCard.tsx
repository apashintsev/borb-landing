import * as React from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { allowedAssets } from '../../../lib/data'
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

export function BetCard() {
    const { web3Provider, address } = useWeb3Context()
    const { selectedAsset, selectedAssetImg, currentRewardPercent } =
        useAppSelector((state) => state.gameSlice)
    const { changeAsset } = gameSlice.actions
    const dispatch = useAppDispatch()

    const [show, setShow] = React.useState<boolean>(false)
    const [popup, setPopup] = React.useState<boolean>(false)
    let ref2 = React.useRef(null)
    const [amount, setAmount] = React.useState<number>(0)
    const amountChangeInputHandler = (
        e: React.ChangeEvent<HTMLInputElement>
    ): void => {
        //if (e.target.value.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
        setAmount(Number.parseFloat(e.target.value))

        checkAllowance(e.target.value)
        // }
    }
    async function checkAllowance(input: string) {
        if (!!address) {
            /*const contractAddress = getTokenAddress(selectedToken)
            const decimals = selectedToken == 'DAI' ? 18 : 6
            try {
                const erc20Contract = ERC20Token__factory.connect(
                    contractAddress,
                    web3Provider!
                )
                //console.log('ia v')
                const value = Number.parseFloat(input) * 10 ** decimals
                //console.log({ value });
                const result = await erc20Contract.allowance(
                    address,
                    process.env.REACT_APP_SMARTCONTRACT_ADDRESS!
                )

                //console.log("ia res"+result);
                if (result.toBigInt() >= value) {
                    //console.log("true " + result.gte(BigNumber.from(value)));
                    setAllowed(true)
                } else {
                    setAllowed(false)
                }
            } catch (e: any) {
                console.log(e)
                toast.error(e.message)
            }*/
        }
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
                                <img
                                    src={selectedAssetImg}
                                    alt={selectedAsset}
                                />
                            </CurrencyWrapper>
                            <span>{selectedAsset}</span>
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
                                            dispatch(changeAsset(item.name))
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
                            onChange={(e) => amountChangeInputHandler(e)}
                        />
                    </div>
                </InputWrapper>
                <HelperRow>
                    <Text>Balance: 263</Text>
                    <Text>
                        ${amount + (amount / 100) * currentRewardPercent} payout
                    </Text>
                </HelperRow>
                <Grid>
                    <Card>10%</Card>
                    <Card>25%</Card>
                    <Card>50%</Card>
                    <Card>75%</Card>
                    <Card>Max</Card>
                </Grid>
                <Buttons>
                    <Button onClick={() => setShow(true)}>
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
                    <Button red onClick={() => setShow(true)}>
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
