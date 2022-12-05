import { useWeb3Context } from '../../../context/Web3Context'
import { addressToPointsFormat } from '../../../lib/sharedFunctions'
import { Card, CardSubLink, Row, RowText, SmallCardContent } from './styles'

export function ReferalBlock() {
    const { address } = useWeb3Context()
    const domain = 'borb.fi/' //window.location.protocol + '//' + window.location.host + '/'
    const referalLink = `?ref=${address}`
    return (
        <Card>
            <Row>
                <img src="/images/earn/link.svg" alt="Ref link" />
                <RowText>Referal</RowText>
            </Row>
            <SmallCardContent>
                {domain + addressToPointsFormat(referalLink, 10, 41)}
            </SmallCardContent>
            <CardSubLink
                onClick={() => {
                    navigator.clipboard.writeText(domain + referalLink)
                }}
            >
                <p>Copy</p>
                <img src="/images/earn/copy.svg" alt="Copy" />
            </CardSubLink>
        </Card>
    )
}
