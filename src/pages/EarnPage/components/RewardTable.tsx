import { useState } from 'react'
import { useWeb3Context } from '../../../context/Web3Context'
import { addressToPointsFormat } from '../../../lib/sharedFunctions'
import { referalApi } from '../../../store/api/referal'
import {
    AdaptiveTable,
    Item,
    Pagination,
    TableGrid,
    TableHead,
    TableRow,
} from './styles'

export function RewardTable() {
    const { address } = useWeb3Context()
    const [currentPage, setCurrentPage] = useState(0)
    const { data: dataRewards } = referalApi.useGetRewardsQuery({
        address: address!,
        pageNumber: currentPage,
    })
    return (
        <>
            <TableGrid>
                <div className="titles">
                    <p>Wallet address</p>
                    <p>Asset</p>
                    <p>Reward earned</p>
                </div>
                <TableHead></TableHead>
                <TableRow>
                    {dataRewards?.data.map((r) => (
                        <Item>
                            <p>{r.walletAddress}</p>
                            <p>{r.asset}</p>
                            <p>${r.rewardEarned}</p>
                        </Item>
                    ))}
                </TableRow>
            </TableGrid>
            <AdaptiveTable>
                <div className="titles">
                    <p>Wallet address</p>
                    <p>Reward earned</p>
                </div>
                <div className="content">
                    {dataRewards?.data.map((r) => (
                        <div className="row">
                            <div className="left">
                                <p>
                                    {addressToPointsFormat(
                                        r.walletAddress,
                                        8,
                                        41
                                    )}
                                </p>
                                <span>{r.asset}</span>
                            </div>
                            <p className="cost">${r.rewardEarned}</p>
                        </div>
                    ))}
                </div>
            </AdaptiveTable>{' '}
            <Pagination>
                <img src="/images/earn/earn_pagination.svg" alt="" />
                <img
                    src="/images/earn/earn_pagination.svg"
                    alt=""
                    style={{ transform: 'rotate(180deg)' }}
                />
            </Pagination>
        </>
    )
}
