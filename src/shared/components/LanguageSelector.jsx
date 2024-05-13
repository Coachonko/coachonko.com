import { component } from '@dark-engine/core'
import { useLocation } from '@dark-engine/web-router'
import { styled } from '@dark-engine/styled'
import { useTranslation } from '@wareme/translations'

import { getAlternatePaths } from '../routes'
import { dynamicMessagesLoading } from '../translations'
import NavigationLink from './NavigationLink'
import { FlexRow } from '../styles/utils'

const StyledDiv = styled(FlexRow)`
  gap: 1vw;
`

const LanguageSelector = component(() => {
  const { pathname } = useLocation()
  const alternatePaths = getAlternatePaths(pathname)
  const { translator } = useTranslation()
  const handleLanguageChange = (event) => {
    const newLanguage = event.target.name
    dynamicMessagesLoading(translator, newLanguage)
  }

  const result = []
  for (const language in alternatePaths) {
    result.push(
      <NavigationLink
        to={alternatePaths[language]}
        name={language}
        onClick={handleLanguageChange}
      >{language}
      </NavigationLink>
    )
  }

  return <StyledDiv>{result}</StyledDiv>
})

export default LanguageSelector
