import { useEffect, useState } from 'react'
import Pagination from '../../../components/Pagination/Pagination'
import { useWeb3Context } from '../../../context/Web3Context'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { addressToPointsFormat } from '../../../lib/sharedFunctions'
import { getRewards } from '../../../store/api/referal'
import { referalRewardsSlice } from '../../../store/reducers/referalRewardsSlice'
import { AdaptiveTable, Item, TableGrid, TableHead, TableRow } from './styles'
import { Spinner } from '../../../components/Spinner/Spinner'
import { toast } from 'react-toastify'

export function RewardTable() {
    const { address } = useWeb3Context()
    const { rewards, hasNext, hasPrevious, isLoading, errors } = useAppSelector(
        (state) => state.referalRewardsSlice
    )
    const [currentPage, setCurrentPage] = useState(0)

    const setPage = (diff: number) => {
        setCurrentPage(currentPage + diff)
    }
    
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!!address) {
            dispatch(
                getRewards({
                    address: address!,
                    pageNumber: currentPage,
                })
            )
        }
    }, [address, currentPage])

    return (
        <>
            <TableGrid>
                <div className="titles">
                    <p>Wallet address</p>
                    <p>Asset</p>
                    <p>Reward earned</p>
                </div>
                <TableHead></TableHead>
                {!isLoading&& <TableRow>
                    {rewards?.map((r, idx) => (
                        <Item key={idx}>
                            <p>{r.walletAddress}</p>
                            <p>{r.asset}</p>
                            <p>${r.rewardEarned}</p>
                        </Item>
                    ))}
                </TableRow>}
            </TableGrid>
            <AdaptiveTable>
                <div className="titles">
                    <p>Wallet address</p>
                    <p>Reward earned</p>
                </div>
                {!isLoading&& <div className="content">
                    {rewards?.map((r, idx) => (
                        <div className="row" key={idx}>
                            <div className="left">
                                <p>{addressToPointsFormat(r.walletAddress, 8, 41)}</p>
                                <span>{r.asset}</span>
                            </div>
                            <p className="cost">${r.rewardEarned}</p>
                        </div>
                    ))}
                </div>}
            </AdaptiveTable>
            {isLoading && <Spinner />}
            {errors?.length > 0 && toast.error(errors.join(','))}
            <Pagination hasNext={hasNext} hasPrev={hasPrevious} setPage={setPage} />
        </>
    )
}
