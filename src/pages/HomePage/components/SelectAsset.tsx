import * as React from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { allowedAssets } from '../../../lib/data'
import { gameSlice } from '../../../store/reducers/gameSlice'

export function SelectAsset() {
    const { asset, assetImg } = useAppSelector((state) => state.gameSlice)
    const { setAsset } = gameSlice.actions
    const dispatch = useAppDispatch()
    const [popup, setPopup] = React.useState<boolean>(false)
    let ref2 = React.useRef(null)
    return (
        <>
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
                    {allowedAssets.map((item, _idx) => (
                        <div
                            key={_idx}
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
        </>
    )
}

export const CurrencyWrapper = styled.div`
    margin-right: 4px;
    display: flex;
    justify-content: center;
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
