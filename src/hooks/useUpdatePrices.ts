import { useEffect, useState } from 'react'
import { HubConnectionBuilder, HubConnection } from '@microsoft/signalr'
import * as SignalR from '@aspnet/signalr'
import { useAppDispatch, useAppSelector } from './redux'
import { gameSlice } from '../store/reducers/gameSlice'

export interface NewPriceInUsdVm {
    BTC: number
    ETH: number
    SOL: number
    BNB: number
    ADA: number
    DOT: number
    MATIC: number
    DOGE: number
    ATOM: number
    AVAX: number
}

export const useUpdatePrices = () => {
    const { currency } = useAppSelector((state) => state.gameSlice)
    const { setCurrencyPrice } = gameSlice.actions
    const dispatch = useAppDispatch()
    const [connection, setConnection] = useState<HubConnection>()

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl(`${process.env.REACT_APP_BACKEND_URI!}/wssrates`, {
                withCredentials: false,
                skipNegotiation: true,
                transport: SignalR.HttpTransportType.WebSockets,
            })
            .withAutomaticReconnect()
            .build()

        setConnection(newConnection)
    }, [])

    useEffect(() => {
        if (connection) {
            connection
                .start()
                .then(() => {
                    connection.on(
                        'NewPriceSetted',
                        (payload: NewPriceInUsdVm) => {
                            //todo destructurize /player?course=JS&lessonId=63297a9684ab95f41e81c175
                            const newPrice = Object.entries(payload).find(
                                (x) => x[0].toUpperCase() === currency.ticker
                            )?.[1]
                            // const newPrice = payload[currency.ticker.toLocaleLowerCase()]
                            
                            // console.log('currency=========>', currency)
                            // console.log('newPrice=========>', newPrice)
                            // console.log('payload==============>', payload)
                            dispatch(setCurrencyPrice(newPrice))
                        }
                    )
                })
                .catch((e: any) => console.log('Connection failed: ', e))
        }
    }, [connection])
}
