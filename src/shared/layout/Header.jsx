import { component, useState, useRef, useEffect } from '@dark-engine/core'
import { styled, css } from '@dark-engine/styled'

import HeaderNav from './HeaderNav'
import { colors, zIndex } from '../styles/constants'

const StyledHeader = styled.header`
  position: absolute;
  transition: transform .3s, background-color .3s;
  transform: translateY(-100%);
  background-color: ${colors.white};
  z-index: ${zIndex.header};
  inset: 0 0 auto;
  padding: 1vw 0;
  ${({ isAtTop }) => {
    if (isAtTop === true) {
      return css`
      background-color: ${colors.white}00;
    `
    }
  }}
  ${({ isVisible }) => {
    if (isVisible === true) {
      return css`
        transform: translateY(0);
      `
    }
  }};
  @media (prefers-reduced-motion: reduce) {
    transform: translateY(0);
    background-color: ${colors.white};
  }
`

const Header = component(({ scrollRef }) => {
  const prevScrollPosition = useRef(0)
  const [isAtTop, setIsAtTop] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const updateState = () => {
      const currentScrollPosition = scrollRef.current.scrollTop
      const isTop = currentScrollPosition === 0
      setIsAtTop(isTop)
      setIsVisible(isTop || currentScrollPosition < prevScrollPosition.current)
      prevScrollPosition.current = currentScrollPosition
    }

    scrollRef.current.addEventListener('scroll', updateState)
    return () => {
      scrollRef.current.removeEventListener('scroll', updateState)
    }
  }, [])

  return (
    <StyledHeader
      isVisible={isVisible}
      isAtTop={isAtTop}
    >
      <HeaderNav />
    </StyledHeader>
  )
})

export default Header
