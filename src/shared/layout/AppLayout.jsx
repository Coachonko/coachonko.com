import { component } from '@dark-engine/core'
import { styled } from '@dark-engine/styled'

import HeaderNav from './HeaderNav'
import FooterMain from './FooterMain'
import FooterBottom from './FooterBottom'
import { FlexColumn } from '../styles/utils'

const StyledHeader = styled.header`
  position: absolute;
  inset: 0;
  height: 5svh;
  display: flex;
  align-items: center;
`

const StyledMain = styled.main`
  margin-top: 5svh;
`

const AppLayout = component(({ slot }) => {
  return (
    <>
      <StyledHeader>
        <HeaderNav />
      </StyledHeader>
      <StyledMain>
        {slot}
      </StyledMain>
      <FlexColumn as='footer'>
        <FooterMain />
        <FooterBottom />
      </FlexColumn>
    </>
  )
})

export default AppLayout
