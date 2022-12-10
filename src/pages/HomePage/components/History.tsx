import { Pagination, Title } from '../components/bottom'
import { Tab, TabContainer } from '../../SupplyPage'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { BetVm } from '../../../@types/Game/bet'
import { BetItem } from './BetItem'
import { betsApi } from '../../../store/api/bets'
import { useAppSelector } from '../../../hooks/redux'
import { allowedTimeframes } from '../../../lib/data'
import { useWeb3Context } from '../../../context/Web3Context'

type ActiveTab = 'Active' | 'Closed' | 'Uncollected'

interface IPagesSettings {
    totalCount: number
    pageSize: number
    currentPage: number
    totalPages: number
    hasPrevious: boolean
    hasNext: boolean
}

export function History() {
    const { address } = useWeb3Context()
    const { asset, selectedTimeframe } = useAppSelector(
        (state) => state.gameSlice
    )
    const [currentPage, setCurrentPage] = useState(0)
    const { data: dataActive } = betsApi.useGetActiveQuery({
        asset: asset,
        address: address!,
        timeframe: allowedTimeframes.find(
            (x) => x.name === selectedTimeframe.name
        )!.value,
        pageNumber: currentPage,
    })
    const { data: dataClosed } = betsApi.useGetClosedQuery({
        asset: asset,
        address: address!,
        timeframe: allowedTimeframes.find(
            (x) => x.name === selectedTimeframe.name
        )!.value,
        pageNumber: currentPage,
    })
    const { data: dataUncollected } = betsApi.useGetUncollectedQuery({
        asset: asset,
        address: address!,
        timeframe: allowedTimeframes.find(
            (x) => x.name === selectedTimeframe.name
        )!.value,
        pageNumber: currentPage,
    })

    const [activeTabName, setActiveTabName] = useState<ActiveTab>('Active')

    const setActiveTab = (tabName: ActiveTab) => {
        setActiveTabName(tabName)
        setCurrentPage(0)
    }

    const getBetList = (): BetVm[] | undefined => {
        if (activeTabName === 'Closed') return dataClosed?.data
        if (activeTabName === 'Uncollected') return dataUncollected?.data
        return dataActive?.data
    }

    const getPageSettings = (): IPagesSettings => {
        const val: IPagesSettings =
            activeTabName === 'Closed'
                ? { ...dataClosed! }
                : activeTabName === 'Uncollected'
                ? { ...dataUncollected! }
                : { ...dataActive! }
        return val
    }

    return (
        <>
            <Title>Trade</Title>
            <div className="tab_container">
                <TabContainer>
                    <Tab
                        active={activeTabName === 'Active'}
                        onClick={() => setActiveTab('Active')}
                    >
                        <span>Active {<h3>{dataActive?.totalCount}</h3>}</span>
                    </Tab>
                    <Tab
                        active={activeTabName === 'Closed'}
                        onClick={() => setActiveTab('Closed')}
                    >
                        <span>Closed {<h3>{dataClosed?.totalCount}</h3>}</span>
                    </Tab>
                    <Tab
                        active={activeTabName === 'Uncollected'}
                        onClick={() => setActiveTab('Uncollected')}
                    >
                        <span>
                            Uncollected {<h3>{dataUncollected?.totalCount}</h3>}
                        </span>
                    </Tab>
                </TabContainer>
            </div>
            <DataTable>
                <DataHeader>
                    <span className="center mobile-display-none">Asset</span>
                    <span className="mobile-no-color">Direction</span>
                    <span className="">Open</span>
                    <span>Close</span>
                    <span className="mobile-display-none">Chart</span>
                    <span className="last">Result</span>
                </DataHeader>

                <DataContent>
                    {getBetList()?.map((bet, _idx) => (
                        <BetItem bet={bet} key={_idx} />
                    ))}
                </DataContent>
            </DataTable>
            <Pagination>
                <img
                    style={{
                        visibility: getPageSettings().hasPrevious
                            ? 'visible'
                            : 'hidden',
                    }}
                    src="/images/home/pagination.svg"
                    alt="Previous"
                    onClick={() => setCurrentPage(currentPage - 1)}
                />

                <img
                    style={{
                        visibility: getPageSettings().hasNext
                            ? 'visible'
                            : 'hidden',
                        transform: 'rotate(180deg)',
                    }}
                    src="/images/home/pagination.svg"
                    alt="Next"
                    onClick={() => setCurrentPage(currentPage + 1)}
                />
            </Pagination>
        </>
    )
}

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
