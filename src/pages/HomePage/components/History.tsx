import { Tab, TabContainer } from '../../SupplyPage'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { BetItem } from './BetItem'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useWeb3Context } from '../../../context/Web3Context'
import { getActiveBets, getClosedBets } from '../../../store/api/bets'
import Pagination from '../../../components/Pagination/Pagination'
import { Spinner } from '../../../components/Spinner/Spinner'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

type ActiveTab = 'Active' | 'Closed'

export function History() {
    const { t } = useTranslation()
    const { address } = useWeb3Context()
    const { asset, timeframe } = useAppSelector((state) => state.gameSlice)
    const { activeBets, closedBets } = useAppSelector((state) => state.historySlice)

    const dispatch = useAppDispatch()

    const [currentPageActive, setCurrentPageActive] = useState(0)
    const [currentPageClosed, setCurrentPageClosed] = useState(0)
    const [activeTabName, setActiveTabName] = useState<ActiveTab>('Active')

    const setActiveTab = (tabName: ActiveTab) => {
        setActiveTabName(tabName)
    }

    const setCurrentPage = (diff: number) => {
        activeTabName === 'Active'
            ? setCurrentPageActive(currentPageActive + diff)
            : setCurrentPageClosed(currentPageClosed + diff)
    }

    const getHasPrev = (): boolean => {
        return (activeTabName === 'Active' ? activeBets : closedBets).hasPrevious
    }

    const getHasNext = (): boolean => {
        return (activeTabName === 'Active' ? activeBets : closedBets).hasNext
    }
    const geIsLoading = (): boolean => {
        return (activeTabName === 'Active' ? activeBets : closedBets).isLoading
    }
    const getErrors = (): string[] => {
        return (activeTabName === 'Active' ? activeBets : closedBets).errors
    }

    useEffect(() => {
        if (!!address) {
            dispatch(
                getActiveBets({
                    asset: asset.name,
                    address: address!,
                    timeframe: timeframe.value,
                    pageNumber: currentPageActive,
                })
            )
        }
    }, [address, asset, currentPageActive, activeBets.toggleRefresh])
    useEffect(() => {
        if (!!address) {
            dispatch(
                getClosedBets({
                    asset: asset.name,
                    address: address!,
                    timeframe: timeframe.value,
                    pageNumber: currentPageClosed,
                })
            )
        }
    }, [address, asset, currentPageClosed, closedBets.toggleRefresh])

    return (
        <>
            <Title>{t('HomePage.History.Title')}</Title>
            <div className="tab_container">
                <TabContainer>
                    <Tab active={activeTabName === 'Active'} onClick={() => setActiveTab('Active')}>
                        <span>
                            {t('HomePage.History.Active')} <h3>{activeBets.count}</h3>
                        </span>
                    </Tab>
                    <Tab active={activeTabName === 'Closed'} onClick={() => setActiveTab('Closed')}>
                        <span>
                            {t('HomePage.History.Closed')} <h3>{closedBets.count}</h3>
                        </span>
                    </Tab>
                </TabContainer>
            </div>
            <DataTable>
                <DataHeader>
                    <span className="center mobile-display-none">{t('HomePage.History.Asset')}</span>
                    <span className="mobile-no-color">{t('HomePage.History.Direction')}</span>
                    <span className="">{t('HomePage.History.Open')}</span>
                    <span>{t('HomePage.History.Close')}</span>
                    <span className="mobile-display-none">{t('HomePage.History.Chart')}</span>
                    <span className="last">{t('HomePage.History.Result')}</span>
                </DataHeader>

                {!geIsLoading() && (
                    <DataContent>
                        {(activeTabName === 'Active' ? activeBets : closedBets)?.bets?.map((bet, _idx) => (
                            <BetItem bet={bet} key={_idx} />
                        ))}
                    </DataContent>
                )}
                {geIsLoading() && <Spinner />}
                {getErrors()?.length > 0 && toast.error(getErrors().join(','))}
            </DataTable>
            <Pagination hasNext={getHasNext()} hasPrev={getHasPrev()} setPage={setCurrentPage} />
        </>
    )
}

const Title = styled.div`
    margin: 48px 0 24px;
    font-weight: 600;
    font-size: 24px;
    color: ${(props) => props.theme.selectColor};
    @media screen and (max-width: 480px) {
        padding: 0 16px;
    }
`

const DataTable = styled.div`
    span {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .center {
        text-align: center;
    }
`
const DataHeader = styled.div`
    display: grid;
    grid-template-columns: 32px 51px 84px repeat(3, 1fr);
    gap: 32px;

    span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 140%;
        text-align: center;
        color: #8a8f99;

        &.last {
            justify-content: flex-end;
        }
    }

    @media screen and (max-width: 768px) {
        gap: 24px;

        grid-template-columns: 32px 32px 84px repeat(3, 1fr);

        .mobile-no-color {
            color: transparent;
        }
    }

    @media screen and (max-width: 480px) {
        padding: 0 16px 0 8px;
        grid-template-columns: repeat(4, 1fr);

        .mobile-display-none {
            display: none;
        }
    }
`

const DataContent = styled.div`
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    row-gap: 33px;

    span {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        text-align: center;
        color: ${({ theme }) => theme.faqColor};

        &.last {
            justify-content: flex-end;
        }

        &.price-increase {
            color: var(--green);
        }

        &.price-drop {
            color: var(--pink);
        }
    }
`
