import styled from 'styled-components'

export const Spinner = () => {
    return (
        <SpinnerContainer>
            <SpinnerItem />
        </SpinnerContainer>
    )
}

const SpinnerContainer = styled.div`
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    
`

const SpinnerItem = styled.div`
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 10px solid rgba(255, 255, 255, 0.1);
    border-top-color: var(--green);
    animation: spin 1s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`