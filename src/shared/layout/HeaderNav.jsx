import { component } from '@dark-engine/core'
import { Link, useLocation } from '@dark-engine/web-router'
import { styled } from '@dark-engine/styled'

import { getHomePath } from '../routes'
import { getLanguageFromPathname } from '../translations'
import NavigationLink from '../components/NavigationLink'
import LanguageSelector from '../components/LanguageSelector'
import { config } from '../config'

const StyledNav = styled.nav`
  display: flex;
  padding: 0 2.5vw;
  justify-content: space-between;
  text-transform: uppercase;
`

const StyledLogo = styled(Link)`
  height: 2vw;
`

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 5vw;
  & div {
    margin: 0 0 0 5vw;
  }
`

const HeaderNav = component(() => {
  const { pathname } = useLocation()
  const currentLanguage = getLanguageFromPathname(pathname)
  const homePath = getHomePath(currentLanguage)

  return (
    <StyledNav>
      <StyledLogo to={homePath}>{config.NAME}</StyledLogo>

      <StyledDiv>
        <NavigationLink to={`${homePath}services`}>Services</NavigationLink>
        <NavigationLink to={`${homePath}about`}>About</NavigationLink>
        <NavigationLink to={`${homePath}contact`}>Contact</NavigationLink>
        <LanguageSelector />
      </StyledDiv>
    </StyledNav>
  )
})

export default HeaderNav
