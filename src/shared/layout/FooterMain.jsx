import { component } from '@dark-engine/core'
import { styled } from '@dark-engine/styled'

import { config } from '../config'
import { formattedPhoneNumber } from '../utils/phone'
import Location from '../components/Location'
import NavigationA from '../components/NavigationA'
import { FlexRow, FlexColumn } from '../styles/utils'

const StyledFooterRow = styled(FlexRow)`
  justify-content: space-between;
  padding: 2.5vw;
`

const StyledContactColumn = styled(FlexColumn)`
  margin: 0 0 0 10vw;
`

const StyledNameSpan = styled.span`
  text-transform: uppercase;
  margin: 0 1rem 0 0;
`

const FooterMain = component(() => {
  return (
    <StyledFooterRow>
      <FlexColumn>
        <StyledNameSpan>{config.NAME}</StyledNameSpan>
        <span>{config.TAGLINE}</span>
      </FlexColumn>

      <FlexRow>
        <FlexColumn>
          <Location />
        </FlexColumn>
        <StyledContactColumn>
          <NavigationA href={`tel:${config.CONTACT_PHONE}`}>{formattedPhoneNumber}</NavigationA>
          <NavigationA href={`mailto:${config.CONTACT_EMAIL}`}>{config.CONTACT_EMAIL}</NavigationA>
        </StyledContactColumn>
      </FlexRow>
    </StyledFooterRow>
  )
})

export default FooterMain
