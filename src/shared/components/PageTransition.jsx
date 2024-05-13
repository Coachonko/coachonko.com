import { component, useMemo, useState, useEffect, useRef } from '@dark-engine/core'
import { Animated, useTransition } from '@dark-engine/animations'
import { useLocation } from '@dark-engine/web-router'
import { styled } from '@dark-engine/styled'

const StyledDiv = styled.div`
  position: absolute; // overlap bottom layer
  background-color: var(--color-white); // cover bottom layer
  width: 100%;
`

const styleFn = (element, value) => {
  const { transform, opacity } = value
  if (transform === 0 && opacity === 1) { // onyl allow clicking when transition is over
    element.style.setProperty('pointer-events', 'auto')
  } else {
    element.style.setProperty('pointer-events', 'none')
  }
  element.style.setProperty('transform', `translate(0, ${transform}vh)`)
  element.style.setProperty('opacity', opacity)
}

const PageTransition = component(({ slot }) => {
  const { pathname } = useLocation() // route cannot be used as key, use pathname instead
  const items = useMemo(() => [pathname], [pathname]) // items must be memoized

  const initialPathname = useRef(pathname)
  const [isFirstRequest, setIsFirstRequest] = useState(true)
  useEffect(() => {
    if (isFirstRequest === true && initialPathname.current !== pathname) {
      setIsFirstRequest(false)
    }
  }, [pathname])

  const [transition] = useTransition(
    items, x => x,
    () => ({
      from: { transform: 100, opacity: 1 },
      enter: { transform: 0, opacity: 1 },
      leave: { transform: 0, opacity: 0.6 },
      immediate: () => isFirstRequest
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
