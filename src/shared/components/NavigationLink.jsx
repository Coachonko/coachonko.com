import { component } from '@dark-engine/core'
import { Link, useLocation } from '@dark-engine/web-router'
import { styled, css } from '@dark-engine/styled'

import { buttonCSS } from '../styles/button'
import { disabledCSS } from '../styles/disabled'

export const baseCSS = () => css`
  text-decoration: none;
  background-image: linear-gradient(currentColor, currentColor);
  background-repeat: no-repeat;
  transition: background-size .3s;

  background-position: 100% 100%;
  background-size: 0 1px;
  @media(hover: hover) {
    &:hover {
      background-position: 0 100%;
      background-size: 100% 1px;
    }
  }

  &:visited, 
  &:link {
    color: unset;
  }
`

const activeCSS = ({ active }) => {
  if (active) {
    return css`
      background-position: 0 100%;
      background-size: 100% 1px;
      @media(hover: hover) {
        &:hover {
          background-position: 100% 100%;
          background-size: 0 1px;
        }
      }
    `
  }
}

export const StyledLink = styled(Link)`
  ${buttonCSS}
  ${({ disabled }) => disabledCSS({ disabled })}
  ${() => baseCSS()}
  ${({ active }) => activeCSS({ active })}
`

const NavigationLink = component(({ to, slot, ...rest }) => {
  const { pathname } = useLocation()
  return <StyledLink active={pathname === to} to={to} {...rest}>{slot}</StyledLink>
})

export default NavigationLink
