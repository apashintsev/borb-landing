import * as React from 'react'
import styled from 'styled-components'

interface IPaginationProps {
    hasPrev: boolean
    hasNext: boolean
    setPage: (next: number) => void
}

const Pagination: React.FunctionComponent<IPaginationProps> = ({ hasPrev, hasNext, setPage }) => {
    return (
        <PaginationBlock>
            <img
                style={{
                    visibility: hasPrev ? 'visible' : 'hidden',
                }}
                src="/images/home/pagination.svg"
                alt="Previous"
                onClick={() => setPage(-1)}
            />

            <img
                style={{
                    visibility: hasNext ? 'visible' : 'hidden',
                    transform: 'rotate(180deg)',
                }}
                src="/images/home/pagination.svg"
                alt="Next"
                onClick={() => setPage(+1)}
            />
        </PaginationBlock>
    )
}

export default Pagination

const PaginationBlock = styled.div`
    margin: 38px auto 0;
    img {
        cursor: pointer;
    }
    img:not(:last-child) {
        margin-right: 24px;
    }

    @media screen and (max-width: 1280px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    @media screen and (max-width: 480px) {
        padding: 0 16px;
    }
`
