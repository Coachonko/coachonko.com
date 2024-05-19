import { component, useRef } from '@dark-engine/core'
import { styled } from '@dark-engine/styled'

import Header from './Header'
import FooterMain from './FooterMain'
import FooterBottom from './FooterBottom'
import { FlexColumn } from '../styles/utils'

const StyledMain = styled.main`
  padding: 6vw 0 0; // TODO
`

const ScrollRoot = styled.div`
  position: absolute;
  inset: 0;
  overflow-y: auto;
`

const AppLayout = component(({ slot }) => {
  const scrollRef = useRef(null)
  return (
    <>
      <Header scrollRef={scrollRef} />
      <ScrollRoot ref={scrollRef}>
        <StyledMain>
          {slot}
        </StyledMain>
        <FlexColumn as='footer'>
          <FooterMain />
          <FooterBottom />
        </FlexColumn>
      </ScrollRoot>
    </>
  )
})

export default AppLayout
