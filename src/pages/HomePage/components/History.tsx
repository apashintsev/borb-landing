import { Pagination, Title } from '../components/bottom'
import { Tab, TabContainer } from '../../SupplyPage'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { BetVm } from '../../../@types/Game/bet'
import { BetItem } from './BetItem'
import { betsApi } from '../../../store/api/bets'
import { useAppSelector } from '../../../hooks/redux'

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
    const { selectedAsset, selectedTimeframe } = useAppSelector(
        (state) => state.gameSlice
    )
    const [pageSettings, setPageSettings] = useState({
        currentPage: 0,
    } as IPagesSettings)
    const { data: dataActive } = betsApi.useGetActiveQuery({
        asset: selectedAsset,
        address: '0x78E4cc313C7ECdD2f86C0A3ac9AbeD26FCcFfF70',
        timeframe: 1,
        pageNumber: pageSettings.currentPage,
    })
    const { data: dataClosed } = betsApi.useGetClosedQuery({
        asset: selectedAsset,
        address: '0x78E4cc313C7ECdD2f86C0A3ac9AbeD26FCcFfF70',
        timeframe: 1,
        pageNumber: pageSettings.currentPage,
    })
    const { data: dataUncollected } = betsApi.useGetClosedQuery({
        asset: selectedAsset,
        address: '0x78E4cc313C7ECdD2f86C0A3ac9AbeD26FCcFfF70',
        timeframe: 1,
        pageNumber: pageSettings.currentPage,
    })

    const [activeTabName, setActiveTabName] = useState<ActiveTab>('Active')
    const [betsList, setBetsList] = useState([] as BetVm[])

    const setActiveTab = (tabName: ActiveTab) => {
        setActiveTabName(tabName)
        setPageSettings({ currentPage: 0 } as IPagesSettings)
    }

    const getBetList = (): BetVm[] | undefined => {
        if (activeTabName === 'Closed') return dataClosed?.data
        if (activeTabName === 'Uncollected') return dataUncollected?.data
        return dataActive?.data
    }

    return (
        <>
            <button
                style={{ backgroundColor: 'red' }}
                onClick={() =>
                    setPageSettings({
                        currentPage: pageSettings.currentPage + 1,
                    } as IPagesSettings)
                }
            >
                inc
            </button>
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
                    <span className="mobile-no-color">Bet Type</span>
                    <span className="mobile-no-color">Direction</span>
                    <span className="">Open</span>
                    <span>Close</span>
                    <span className="mobile-display-none">Chart</span>
                    <span className="last">Result</span>
                </DataHeader>

                <DataContent>
                    {getBetList()?.map((bet) => (
                        <BetItem bet={bet} />
                    ))}
                </DataContent>
            </DataTable>
            <Pagination>
                {pageSettings.hasPrevious && (
                    <img src="/images/home/pagination.svg" alt="Previous" />
                )}
                {pageSettings.hasNext && (
                    <img
                        src="/images/home/pagination.svg"
                        alt="Next"
                        style={{ transform: 'rotate(180deg)' }}
                    />
                )}
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
    grid-template-columns: 32px 51px 50px 60px repeat(3, 1fr);
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
