import { component } from '@dark-engine/core'
import { useLocation } from '@dark-engine/web-router'
import { styled } from '@dark-engine/styled'

import { getHomePath } from '../routes'
import { getLanguageFromPathname } from '../translations'
import NavigationLink from '../components/NavigationLink'
import LanguageSelector from '../components/LanguageSelector'
import { config } from '../config'

const StyledNav = styled.nav`
  display: flex;
  width: 100%;
  padding: 0 2.5vw;
  justify-content: space-between;
  text-transform: uppercase;
`

const StyledDiv = styled.div`
  display: flex;
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
      <NavigationLink to={homePath}>{config.NAME}</NavigationLink>

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
