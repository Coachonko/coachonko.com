import { css } from '@dark-engine/styled'

export const disabledCSS = ({ disabled }) => {
  if (disabled) {
    return css`
      pointer-events: none;
      opacity: .2;
    `
  }
  return ''
}
