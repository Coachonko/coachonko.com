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
  flex: 1;
`

const Title = styled.h1`
  font-weight: 300;
  font-size: 9.6vw;
  line-height: .9;
  padding: 0 0 2svh;
`

const LinksRow = styled(FlexRow)`
  justify-content: space-between;
  gap: 2.5vw;
`

const StyledUl = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  width: 100%;
  & li {
    list-style: none;
    border-bottom: ${props => props.theme.borderStyle};
  }
`

const StyledA = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration: none;
  color: ${props => props.theme.black};
  padding: .5vw 0;
  transition: color .2s, background-color .2s, padding .3s;
  &:hover {
    color: ${props => props.theme.white};
    background-color: ${props => props.theme.black};
    padding: .5vw;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Contact = component(() => {
  const { t } = useTranslation('contact')

  return (
    <StyledSection>
      <StyledSectionColumn>
        <Title>{t('title')}</Title>
      </StyledSectionColumn>

      <StyledSectionColumn>
        <LinksRow>
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
        </LinksRow>

        <FlexRow>
          form
        </FlexRow>
      </StyledSectionColumn>
    </StyledSection>
  )
})

export default Contact
