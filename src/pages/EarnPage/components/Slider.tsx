import { ethers } from 'ethers'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
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
    const { t } = useTranslation()
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
    const [reload, setReload] = useState<number>(0)

    useEffect(() => {
        // Using an IIFE
        ;(async function anyNameFunction() {
            if (!web3Provider) return

            const poolContract = Pool__factory.connect(poolContractAddress, web3Provider!)
            let newBalances: number[] = []
            try {
                for (let i = 0; i < allowedAssets.length; i++) {
                    const balance = await poolContract.referalBalanceOf(i, address!)
                    newBalances[i] = Number.parseFloat(ethers.utils.formatUnits(balance, 6))
                }
                setBalances([...newBalances])
            } catch (e: any) {
                console.error(e)
            }
        })()
    }, [address, reload])

    async function claim(assetId: number) {
        if (balances[assetId] == 0) {
            toast.info(t('EarnPage.Nothing to claim'))
            return
        }
        const poolContract = Pool__factory.connect(poolContractAddress, web3Provider!)
        try {
            const result = await poolContract.connect(web3Provider!.getSigner()).claimReward(
                assetId,
                { gasLimit: 3000000 } //todo это убрать
            )
            toast
                .promise(result.wait(), {
                    pending: t<string>('EarnPage.ClaimSection.Claiming reward'),
                    success: t<string>('EarnPage.ClaimSection.Reward claimed 👌'),
                    error: t<string>('EarnPage.ClaimSection.Error 🤯'),
                })
                .then((_) => setReload((prev) => prev + 1))
        } catch (e: any) {
            console.error(e)
        }
    }

    return (
        <div className="swiper">
            <Swiper
                spaceBetween={16}
                onInit={(v) => {
                    swiperRef.current = v.el
                }}
                slidesPerView={getSlidesPerView}
                observeParents={true}
                observer={true}
                noSwiping={false}
                noSwipingClass={'swiper-slide'}
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
                            <CardContentText>{`$ ${balances[asset.id] ?? 0}`}</CardContentText>
                            <CardSubLink>
                                <p onClick={() => claim(asset.id)}>{t('EarnPage.ClaimSection.Claim')}</p>
                                <img src="/images/earn/arrow.svg" alt="Claim" />
                            </CardSubLink>
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
