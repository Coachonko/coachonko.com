import { styled } from '@dark-engine/styled'

import { buttonCSS } from '../styles/button'
import { disabledCSS } from '../styles/disabled'
import { baseCSS } from './NavigationLink'

const NavigationA = styled.a`
  ${buttonCSS}
  ${({ $disabled }) => disabledCSS({ $disabled })}
  ${() => baseCSS()}
`

export default NavigationA
