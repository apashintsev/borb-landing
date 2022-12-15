import { useTranslation } from 'react-i18next'
import { Faq } from '../../components/Faq'
import { RewardTable } from './components/RewardTable'
import { Slider } from './components/Slider'
import { RewardTitle, StyledEarn, SubText, Title } from './components/styles'

const EarnPage = () => {
    const { t } = useTranslation()
    return (
        <StyledEarn>
            <div className="container">
                <Title>{t('EarnPage.Title')}</Title>
                <SubText>{t('EarnPage.Subitle')}</SubText>
                <Slider />
                <RewardTitle>{t('EarnPage.Reward')}</RewardTitle>
                <RewardTable />
                <div className="faq">
                    <Faq />
                </div>
            </div>
        </StyledEarn>
    )
}

export default EarnPage
