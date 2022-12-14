import * as React from 'react'
import { BorbGame__factory } from '../../../@types/contracts/BorbGame__factory'
import { useWeb3Context } from '../../../context/Web3Context'
import { useAppSelector } from '../../../hooks/redux'
import { useUserNotifications } from '../../../hooks/useUserNotifications'
import { useOnClickOutside } from '../../../lib/useOnClickOutside'
import {
    Column,
    Head,
    Popup,
    PopupBottom,
    PopupButton,
    PopupContent,
    PopupTitle,
} from './main'

export function PopupWindow() {
    useUserNotifications()
    const { web3Provider, address } = useWeb3Context()
    const { asset, gameContractAddress } = useAppSelector(
        (state) => state.gameSlice
    )

    const [show, setShow] = React.useState<boolean>(false)
    let ref = React.useRef(null)
    useOnClickOutside(ref, () => setShow(false))

    React.useEffect(() => {
        // Using an IIFE
        ;(async function anyNameFunction() {
            if (!web3Provider) return

            const gameContract = BorbGame__factory.connect(
                gameContractAddress,
                web3Provider!
            )
            const startBlockNumber = await web3Provider!.getBlockNumber()
            gameContract.on('BetClaimed', (...args) => {
                const event = args[args.length - 1]
                if (event.blockNumber <= startBlockNumber) {
                    if (args[0] == address) {
                        setShow(true)
                    }
                    //args[0], args[1]
                }
            })
        })()
    }, [asset, address])

    return (
        <Popup show={show}>
            <PopupContent ref={ref}>
                <Head>
                    <PopupTitle>Trade result</PopupTitle>
                    <img
                        src="/images/home/close.svg"
                        alt="Close"
                        onClick={() => setShow(false)}
                    />
                </Head>
                <PopupBottom>
                    <Column>
                        <p>Asset</p>
                        <img src="/images/home/bitcoin.svg" alt="" />
                    </Column>
                    <Column>
                        <p>Direction</p>
                        <svg
                            style={{
                                position: 'relative',
                                bottom: '-6px',
                            }}
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M16 12L22 20H10L16 12Z"
                                fill="var(--green)"
                            />
                        </svg>
                    </Column>
                    <Column>
                        <p>Timeframe</p>
                        <span>15 min</span>
                    </Column>
                    <Column>
                        <p>Result</p>
                        <span>+100 Usd</span>
                    </Column>
                </PopupBottom>
            </PopupContent>
        </Popup>
    )
}
