import { component } from '@dark-engine/core'
import { styled } from '@dark-engine/styled'
import { useTranslation } from '@wareme/translations'

import { config } from '../config'

const Hero = styled.section`
  height: calc(100svh - ${props => props.theme.headerHeight});

  @media (min-width: ${props => props.theme.sm}px) {
    height: calc(100vh - ${props => props.theme.headerHeightSm});
  } 
`

const Logo = styled.img`
  height: 30%;
  width: 40%;
`

const Home = component(() => {
  const { t } = useTranslation()

  return (
    <Hero>
      <div>
        <Logo alt={config.NAME} />
      </div>
      <div>
        desc
      </div>
    </Hero>
  )
})

export default Home
