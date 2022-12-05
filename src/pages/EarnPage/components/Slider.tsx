import { ethers } from 'ethers'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pool__factory } from '../../../@types/contracts/Pool__factory'
import { useWeb3Context } from '../../../context/Web3Context'
import { useAppSelector } from '../../../hooks/redux'
import { useMediaQuery } from '../../../hooks/useMediaQuery'
import { allowedAssets } from '../../../lib/data'
import { ReferalBlock } from './ReferalBlock'
import { Card, CardContentText, CardSubLink, Row, RowText } from './styles'

export function Slider() {
    const swiperRef = useRef<HTMLElement | null>(null)
    const { address, web3Provider } = useWeb3Context()
    const { poolContractAddress } = useAppSelector((state) => state.gameSlice)

    const tablet = useMediaQuery('(max-width: 768px)')
    const mobile = useMediaQuery('(max-width: 480px)')
    const getSlidesPerView = React.useMemo(() => {
        if (mobile) return 1.2
        if (tablet) return 1.8
        return 3
    }, [tablet, mobile])

    const [balances, setBalances] = useState<number[]>([0, 0])

    useEffect(() => {
        // Using an IIFE
        ;(async function anyNameFunction() {
            if (!web3Provider) return

            const poolContract = Pool__factory.connect(
                poolContractAddress,
                web3Provider!
            )
            const newBalances: number[] = []
            try {
                allowedAssets.forEach(async (x) => {
                    const balance = await poolContract.referalBalanceOf(
                        x.id,
                        address!
                    )
                    newBalances.push(
                        Number.parseFloat(ethers.utils.formatUnits(balance, 6))
                    )
                })
                console.log({ newBalances })
                setBalances(newBalances)
            } catch (e: any) {
                console.error(e)
            }
        })()
    }, [address])

    async function claim(assetId: number) {
        const poolContract = Pool__factory.connect(
            poolContractAddress,
            web3Provider!
        )
        try {
            const result = await poolContract
                .connect(web3Provider!.getSigner())
                .claimReward(
                    assetId,
                    { gasLimit: 3000000 } //todo это убрать
                )
            toast.info('Wait for transaction...')
            await result.wait()
        } catch (e: any) {
            console.error(e)
        }
    }

    return (
        <div className="swiper">
            <Swiper
                // onSlideChange={}
                spaceBetween={16}
                onInit={(v) => {
                    swiperRef.current = v.el
                }}
                slidesPerView={getSlidesPerView}
                observeParents={true}
                observer={true}
                noSwiping={false}
                noSwipingClass={'swiper-slide'}
                // style={{ padding: '0 20px' }}
            >
                <SwiperSlide key={0}>
                    <ReferalBlock />
                </SwiperSlide>
                {allowedAssets.map((asset, _idx) => (
                    <SwiperSlide key={_idx + 1}>
                        <Card>
                            <Row>
                                <img src={asset.img} alt={asset.name} />
                                <RowText>{asset.name}</RowText>
                            </Row>
                            <CardContentText>{`$ ${balances[_idx]}`}</CardContentText>
                            <CardSubLink>
                                <p onClick={() => claim(_idx)}>Claim</p>
                                <img src="/images/earn/arrow.svg" alt="Claim" />
                            </CardSubLink>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
