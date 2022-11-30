import { produceWithPatches } from 'immer'
import React, { FunctionComponent, ReactNode } from 'react'
import { useWeb3Context } from '../../context/Web3Context'
//import { Web3Address } from "../Web3Address/Web3Address";

interface ConnectProps {
    children: ReactNode
    connect: (() => Promise<void>) | null
}
const ConnectButton: FunctionComponent<ConnectProps> = (props) => {
    return props.connect ? (
        <button onClick={props.connect}>{props.children}</button>
    ) : (
        <button>Loading...</button>
    )
}

interface DisconnectProps {
    children: ReactNode
    disconnect: (() => Promise<void>) | null
}

const DisconnectButton: FunctionComponent<DisconnectProps> = (props) => {
    return props.disconnect ? (
        <button onClick={props.disconnect}>{props.children}</button>
    ) : (
        <button>Loading...</button>
    )
}

interface Web3ButtonProps {
    children: ReactNode
}

export const Web3Button: FunctionComponent<Web3ButtonProps> = (props) => {
    const { web3Provider, connect, disconnect } = useWeb3Context()

    return web3Provider ? (
        <DisconnectButton disconnect={disconnect}>{props.children}</DisconnectButton>
    ) : (
        <ConnectButton connect={connect}>{props.children}</ConnectButton>
    )
}
