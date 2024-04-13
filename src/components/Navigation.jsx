import { component } from '@dark-engine/core'
import { RouterLink, useLocation } from '@dark-engine/web-router'

import { getHomePath } from '../routes'
import { getLanguageFromPathname } from '../translations'
import LanguageSelector from './LanguageSelector'

const Navigation = component(({ slot }) => {
  const { pathname } = useLocation()
  const currentLanguage = getLanguageFromPathname(pathname)
  const homePath = getHomePath(currentLanguage)

  return (
    <>
      <nav>
        <RouterLink to={`${homePath}`}>Home</RouterLink>
        <RouterLink to={`${homePath}contact`}>Contact</RouterLink>
        <RouterLink to={`${homePath}bruv`}>NotFound</RouterLink>
        <LanguageSelector />
      </nav>
      {slot}
      <footer>
        footer
      </footer>
    </>
  )
})

export default Navigation
