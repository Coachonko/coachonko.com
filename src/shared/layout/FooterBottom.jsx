import { component } from '@dark-engine/core'
import { styled } from '@dark-engine/styled'

import { config } from '../config'
import FooterNav from './FooterNav'
import Copyright from '../components/Copyright'
import { FlexRow, FlexColumn } from '../styles/utils'

const StyledDiv = styled(FlexRow)`
  justify-content: space-between;
  padding: 2.5vw;
`

const FooterBottom = component(() => {
  return (
    <StyledDiv>
      <FlexColumn>
        <span>VAT: {config.VAT_ID}</span>
        <span><Copyright name={config.NAME} /></span>
      </FlexColumn>

      <FooterNav />
    </StyledDiv>
  )
})

export default FooterBottom
