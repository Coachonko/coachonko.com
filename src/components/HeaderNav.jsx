import { component } from '@dark-engine/core'
import { Link, useLocation } from '@dark-engine/web-router'

import { getHomePath } from '../routes'
import { getLanguageFromPathname } from '../translations'
import LanguageSelector from './LanguageSelector'

const HeaderNav = component(() => {
  const { pathname } = useLocation()
  const currentLanguage = getLanguageFromPathname(pathname)
  const homePath = getHomePath(currentLanguage)

  return (
    <nav>
      <Link to={`${homePath}`}>Home</Link>
      <Link to={`${homePath}contact`}>Contact</Link>
      <Link to={`${homePath}bruv`}>NotFound</Link>
      {/* <LanguageSelector /> */}
    </nav>
  )
})

export default HeaderNav
