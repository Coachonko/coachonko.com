import { component } from '@dark-engine/core'
import { styled } from '@dark-engine/styled'
import { useTranslation } from '@wareme/translations'

import { config } from '../config'
import { formattedPhoneNumber } from '../utils/phone'
import { FlexRow, FlexColumn } from '../styles/utils'

const StyledSection = styled(FlexRow)`
  padding: 10svh 2.5vw;
  justify-content: space-between;
`

const StyledSectionColumn = styled(FlexColumn)`
  min-width: 45%;
  max-width: 45%;
`

const Title = styled.h1`
  font-weight: inherit;
  font-size: 900%; // TODO fluid: depend on vw, but keep using html font-size 100%
  line-height: .9;
  margin: 0;
  padding: 0 0 2svh;
`

const StyledFlexRow = styled(FlexRow)`
  justify-content: space-between;
`

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  & li {
    list-style: none;
  }
`

const StyledA = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Contact = component(() => {
  const { t } = useTranslation('contact')

  return (
    <StyledSection>
      <StyledSectionColumn>
        <Title>{t('title')}</Title>
      </StyledSectionColumn>

      <StyledSectionColumn>
        <StyledFlexRow>
          <StyledUl>
            <li>
              <StyledA href={`tel:${config.CONTACT_PHONE}`}>
                <span>{t('phone')}</span>
                <span>{formattedPhoneNumber}</span>
              </StyledA>
            </li>
            <li>
              <StyledA href={`mailto:${config.CONTACT_EMAIL}`}>
                <span>Email</span>
                <span>{config.CONTACT_EMAIL}</span>
              </StyledA>
            </li>
          </StyledUl>
          <StyledUl>
            <li>
              <StyledA href={`https://instagram.com/${config.INSTAGRAM_USERNAME}`}>
                <span>Instagram</span>
                <span>{config.INSTAGRAM_USERNAME}</span>
              </StyledA>
            </li>
            <li>
              <StyledA href={`https://facebook.com/${config.FACEBOOK_USERNAME}`}>
                <span>Facebook</span>
                <span>{config.FACEBOOK_USERNAME}</span>
              </StyledA>
            </li>
            <li>
              <StyledA href={`https://twitter.com/${config.TWITTER_USERNAME}`}>
                <span>Twitter/X</span>
                <span>{config.TWITTER_USERNAME}</span>
              </StyledA>
            </li>
          </StyledUl>
        </StyledFlexRow>

        <FlexRow>
          form
        </FlexRow>
      </StyledSectionColumn>
    </StyledSection>
  )
})

export default Contact
