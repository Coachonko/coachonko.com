import { component } from '@dark-engine/core'
import { useLocation } from '@dark-engine/web-router'
import { styled } from '@dark-engine/styled'

import { getHomePath } from '../routes'
import { getLanguageFromPathname } from '../translations'
import NavigationLink from '../components/NavigationLink'
import { FlexColumn } from '../styles/utils'

const StyledNav = styled(FlexColumn)`
  align-items: flex-start;
`

const FooterNav = component(() => {
  const { pathname } = useLocation()
  const language = getLanguageFromPathname(pathname)
  const homePath = getHomePath(language)
  return (
    <StyledNav as='nav'>
      <NavigationLink to={`${homePath}privacy`}>Privacy policy</NavigationLink>
      <NavigationLink to={`${homePath}legal`}>Legal notice</NavigationLink>
    </StyledNav>
  )
})

export default FooterNav
