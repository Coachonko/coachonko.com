import { component, useMemo, useState, useEffect, useRef } from '@dark-engine/core'
import { Animated, useTransition } from '@dark-engine/animations'
import { useLocation } from '@dark-engine/web-router'
import { styled } from '@dark-engine/styled'

import { isAlternatePath } from '../routes/utils'
import { colors } from '../styles/constants'
import { detectIsBrowser } from '@dark-engine/platform-browser'

const StyledDiv = styled.div`
  position: absolute; // overlap bottom layer
  inset: 0; // cover entire viewport
  background-color: ${colors.white}; // cover bottom layer
  width: 100%;
`

const styleFn = (element, value) => {
  const { transform, brightness } = value
  element.style.setProperty('transform', `translate(0, ${transform}vh)`)
  element.style.setProperty('filter', `brightness(${brightness})`)

  // Remove inline styles when transition is over, otherwise prevent clicking
  if (transform === 0 && brightness === 1) {
    element.removeAttribute('style')
  } else {
    element.style.setProperty('pointer-events', 'none')
  }
}

// getPrefersReducedMotion returns true if the user prefers reduced motion. Also returns true on the
// server.
const getPrefersReducedMotion = () => {
  if (detectIsBrowser()) {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return true
}

const PageTransition = component(({ slot }) => {
  const { pathname } = useLocation() // route cannot be used as key, use pathname instead
  const items = useMemo(() => [pathname], [pathname]) // items must be memoized

  const prefersReducedMotion = getPrefersReducedMotion()

  const [isFirstRender, setIsFirstRender] = useState(true)
  useEffect(() => {
    setIsFirstRender(false)
  }, [])

  const prevPathname = useRef(pathname)
  const languageChanged = isAlternatePath(prevPathname.current, pathname)
  useEffect(() => {
    prevPathname.current = pathname
  }, [pathname])

  const [transition] = useTransition(items, x => x, () => ({
    from: { transform: 100, brightness: 1 },
    enter: { transform: 0, brightness: 1 },
    leave: { transform: 0, brightness: 0.6 },
    immediate: () => prefersReducedMotion || isFirstRender || languageChanged
  }))

  const scope = useMemo(() => ({}), [])
  scope[pathname] = slot

  return transition(({ spring, item }) => {
    return (
      <Animated spring={spring} fn={styleFn}>
        <StyledDiv>
          {scope[item]}
        </StyledDiv>
      </Animated>
    )
  })
})

export default PageTransition
