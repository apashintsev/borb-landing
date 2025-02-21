import styled from 'styled-components'

const StyledHome = styled.div`
    margin-bottom: 48px;
    .input_wrapper,
    .btc_wrapper {
        position: relative;
    }
    .container {
        display: flex;
        flex-direction: column;
    }

    .btc {
        display: none;
        align-items: center;
        cursor: pointer;
        margin-bottom: 16px;
        .currency {
            width: 32px;
            height: 32px;
            margin-right: 8px;
        }
        h4 {
            text-transform: uppercase;
            font-weight: 600;
            font-size: 36px;
            color: ${(props) => props.theme.arrowBackgroundColor};
        }
        path {
            fill: ${(props) => props.theme.arrowBackgroundColor};
        }
    }
    @media screen and (max-width: 1280px) {
        margin-bottom: 24px;
        .btc {
            display: flex;
        }
    }
    @media screen and (max-width: 1000px) {
        .btc {
            margin-bottom: 12px;
        }
    }
    @media screen and (max-width: 768px) {
        .btc {
            margin-bottom: 4px;
            h4 {
                font-size: 32px;
            }
        }
    }
    @media screen and (max-width: 480px) {
        .container {
            padding: 0;
        }
        .btc,
        .tab_container {
            padding: 0 16px;
        }
    }
`

const Row = styled.div`
    display: grid;
    grid-template-columns: 1fr 388px;
    grid-gap: 48px;
    justify-content: space-between;
    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }
`

const Left = styled.div`
    .left_row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .times {
        width: 200px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    p.cost {
        font-size: 24px;
        color: ${(props) => props.theme.selectColor};
        font-weight: 600;
    }
    p.time {
        cursor: pointer;
        color: var(--grey60);
        font-size: 14px;
        font-weight: 400;
    }
    p.active {
        color: var(--green);
    }
    @media screen and (max-width: 480px) {
        padding: 0 16px; 
        .left_row { 
            display: grid;
            grid-template-columns: 1fr;
            grid-gap: 24px;
        }
    }
`

const Right = styled.div`
    padding: 24px;
    background: ${(props) => props.theme.inputWrapperDisabledColor};
    border-radius: 16px;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;
    height: 400px;
    @media screen and (max-width: 1000px) {
        padding: 32px 0 40px;
    }
    @media screen and (max-width: 480px) {
        padding: 32px 16px 40px;
        border-radius: 0;
    }
`

const Counter = styled.h4`
    margin-bottom: 32px;
    color: var(--green);
    font-size: 60px;
    font-weight: 600;

    @media screen and (max-width: 1000px) {
        margin-bottom: 20px;
        font-size: 56px;
    }
`

const Grid = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 32px;
    justify-content: space-between;
    grid-gap: 6px;
    margin-top: 24px;
    margin-bottom: 64px;

    @media screen and (max-width: 1000px) {
        margin-bottom: 48px;
    }

    @media screen and (max-width: 768px) {
        margin-bottom: 40px;
    }
`

const Card = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--grey60);
    font-size: 14px;
    font-weight: 400;
    background: #e9ecf2;
    border-radius: 80px;
    cursor: pointer;
    background: ${(props) => props.theme.homePageButton};
`

const Buttons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 8px;
    width: 100%;
`

const Button = styled.button<{ red?: boolean }>`
    border-radius: 60px;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    background: ${(props: any) => (props.red ? 'var(--pink)' : 'var(--green)')};
`

const HelperRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin-top: 12px;
`

const Text = styled.div`
    color: var(--grey60);
    font-size: 14px;
    font-weight: 400;
`

const Popup = styled.div<{ show?: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    display: grid;
    place-content: center;

    display: ${(props: any) => (props.show ? 'grid' : 'none')};
`

const PopupContent = styled.div`
    background: #fff;
    width: 600px;
    border-radius: 16px;
    margin-top: auto;
    background: ${(props) => props.theme.backgroundContent};

    @media screen and (max-width: 768px) {
        width: 90vw;
        height: 90vh;
        display: flex;
        flex-direction: column;
    }
`
const Head = styled.div`
    padding: 24px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
        cursor: pointer;
    }
`
const PopupTitle = styled.h4`
    font-size: 24px;
    font-weight: 600;
    color: ${(props) => props.theme.arrowBackgroundColor};
`
const PopupBottom = styled.div`
    background: ${(props) => props.theme.inputDisabledBorderColor};
    margin-top: 32px;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
    padding: 32px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 152px;
    grid-template-rows: 48px;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
        margin-top: auto;
        padding: 20px 16px;
        grid-template-columns: 32px 51px 61px 152px;
    }
    @media screen and (max-width: 480px) {
        grid-template-rows: 48px 48px;
        grid-template-columns: 32px 51px 61px;
        grid-row-gap: 21px;
    }
`
const Column = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100%;

    p {
        color: var(--grey80);
        font-size: 12px;
        font-weight: 400;
    }
    span {
        margin-top: 4px;
        font-weight: 600;
        font-size: 16px;
        color: ${(props) => props.theme.arrowBackgroundColor};
    }
    @media screen and (max-width: 480px) {
        &:nth-child(1) {
            grid-area: 1 / 1 / 2 / 2;
        }
        &:nth-child(2) {
            grid-area: 1 / 2 / 2 / 3;
        }
        &:nth-child(3) {
            grid-area: 1 / 3 / 2 / 4;
        }
    }
`
const PopupButton = styled.div`
    padding: 13px 32px;
    background: var(--green);
    border-radius: 8px;
    cursor: pointer;
    color: var(--dark-green);
    font-size: 16px;
    font-weight: 600;
    @media screen and (max-width: 480px) {
        grid-area: 2 / 1 / 3 / 4;
        text-align: center;
    }
`

export {
    Head,
    PopupBottom,
    PopupTitle,
    Column,
    PopupButton,
    Popup,
    PopupContent,
    Text,
    HelperRow,
    Row,
    Button,
    Buttons,
    StyledHome,
    Left,
    Right,
    Counter,
    Grid,
    Card,
}
