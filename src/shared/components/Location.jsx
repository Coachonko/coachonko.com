import { component } from '@dark-engine/core'
import { styled } from '@dark-engine/styled'

import { config } from '../config'
import { FlexColumn } from '../styles/utils'

const StyledAddress = styled(FlexColumn)`
  font-style: inherit;
`

const Location = component(() => {
  return (
    <StyledAddress as='address'>
      <span>{config.ADDRESS_STREET}</span>
      <span>{config.ADDRESS_ZIP} {config.ADDRESS_CITY}</span>
      <span>{config.ADDRESS_COUNTRY}</span>
    </StyledAddress>
  )
})

export default Location
