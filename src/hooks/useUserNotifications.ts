import { useEffect, useState } from 'react'
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'
import * as SignalR from '@aspnet/signalr'
import { useAppDispatch } from './redux'
import { gameSlice } from '../store/reducers/gameSlice'
import { useWeb3Context } from '../context/Web3Context'
import { BetVm } from '../@types/Game/bet'
import { historySlice } from '../store/reducers/historySlice'

export const useUserNotifications = () => {
    const { address } = useWeb3Context()
    const dispatch = useAppDispatch()
    const [connection, setConnection] = useState<HubConnection>()
    const { setIsPopupOpen, setClosedBet } = gameSlice.actions
    const { refreshClosedBets, refreshActiveBets } = historySlice.actions

    useEffect(() => {
        if (!!address) {
            const newConnection = new HubConnectionBuilder()
                .withUrl(`${process.env.REACT_APP_BACKEND_URI!}/wssuser?address=${address}`, {
                    withCredentials: false,
                    skipNegotiation: true,
                    transport: SignalR.HttpTransportType.WebSockets,
                })
                .withAutomaticReconnect()
                .build()

            setConnection(newConnection)
        } else if (!!connection) {
            connection.stop()
        }
    }, [address])

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on('BetClosed', (payload: BetVm) => {
                        dispatch(setClosedBet(payload))
                        dispatch(setIsPopupOpen(true))
                        dispatch(refreshClosedBets())
                        dispatch(refreshActiveBets())
                    })
                })
                .catch((e: any) => console.log('Connection failed: ', e))
        }
    }, [connection])
}
