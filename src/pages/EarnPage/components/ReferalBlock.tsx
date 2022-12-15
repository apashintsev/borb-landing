import { ethers } from 'ethers'
import { useTranslation } from 'react-i18next'
import { useWeb3Context } from '../../../context/Web3Context'
import { addressToPointsFormat } from '../../../lib/sharedFunctions'
import { Card, CardSubLink, Row, RowText, SmallCardContent } from './styles'

export function ReferalBlock() {
    const { t } = useTranslation()
    const { address } = useWeb3Context()
    const domain = 'borb.fi/'
    const referalLink = `?ref=${address ?? ethers.constants.AddressZero}`
    return (
        <Card>
            <Row>
                <img src="/images/earn/link.svg" alt="Ref link" />
                <RowText>{t('EarnPage.Referal')}</RowText>
            </Row>
            <SmallCardContent>{domain + addressToPointsFormat(referalLink, 10, 41)}</SmallCardContent>
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
