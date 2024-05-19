import { component, useState, useRef, useEffect } from '@dark-engine/core'
import { styled, css } from '@dark-engine/styled'
import { useScrollbarWidth } from '@wareme/use-scrollbar-width'

import HeaderNav from './HeaderNav'

const StyledHeader = styled.header`
  position: absolute;
  transition: transform .3s, background-color .3s;
  transform: translateY(-100%);
  background-color: ${props => props.theme.white}00;
  z-index: ${props => props.theme.zHeader};
  ${props => {
    if (props.$scrollbarWidth === 0) {
      return css`inset: 0 0 auto;`
    }
    return css`inset: 0 ${props.$scrollbarWidth}px auto 0;`
  }};
  ${props => {
    if (props.$isVisible === true) {
      return css`
        transform: translateY(0);
        background-color: ${props.theme.white};
      `
    }
  }};
  height: ${props => props.theme.headerHeight};

  @media (min-width: ${props => props.theme.sm}) {
    height: ${props => props.theme.headerHeightSm};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Header = component(({ scrollRef }) => {
  const scrollbarWidth = useScrollbarWidth()
  const prevScrollPosition = useRef(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const updateState = () => {
      const currentScrollPosition = scrollRef.current.scrollTop
      const isTop = currentScrollPosition === 0
      setIsVisible(isTop || currentScrollPosition < prevScrollPosition.current)
      prevScrollPosition.current = currentScrollPosition
    }

    scrollRef.current.addEventListener('scroll', updateState)
    return () => {
      scrollRef.current.removeEventListener('scroll', updateState)
    }
  }, [])

  return (
    <StyledHeader $isVisible={isVisible} $scrollbarWidth={scrollbarWidth}>
      <HeaderNav />
    </StyledHeader>
  )
})

export default Header
