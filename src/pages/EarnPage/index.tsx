import React, { useMemo, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Faq } from '../../components/Faq'
import { useWeb3Context } from '../../context/Web3Context'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { allowedAssets } from '../../lib/data'
import { addressToPointsFormat } from '../../lib/sharedFunctions'
import { ReferalBlock } from './components/ReferalBlock'
import { RewardTable } from './components/RewardTable'
import { Slider } from './components/Slider'
import {
    AdaptiveTable,
    Card,
    CardContentText,
    CardSubLink,
    Item,
    Pagination,
    RewardTitle,
    Row,
    RowText,
    SmallCardContent,
    StyledEarn,
    SubText,
    TableGrid,
    TableHead,
    TableRow,
    Title,
} from './components/styles'

const EarnPage = () => {
    const { address } = useWeb3Context()

    return (
        <StyledEarn>
            <div className="container">
                <Title>Earn crypto by referring friends</Title>
                <SubText>
                    Share your referal link, invite friend and you'll be
                    rewarded with 50% of their trading fees
                </SubText>
                <Slider />
                <RewardTitle>Reward</RewardTitle>
                <RewardTable />
                <div className="faq">
                    <Faq />
                </div>
            </div>
        </StyledEarn>
    )
}

export default EarnPage
