import { component, useEffect, useState } from '@dark-engine/core'
import { Link } from '@dark-engine/web-router'
import { styled, css } from '@dark-engine/styled'
import { useTranslation } from '@wareme/translations'
import { useInView } from '@wareme/use-in-view'

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`

const StyledSection = styled.section`
  pointer-events: none; // pointer-events: auto; breaks the Link component. Is this a bug in Dark?
  border-bottom: ${props => props.theme.borderStyle};
  margin: 0 2.5vw;
  padding: 2.5vw 0;
  // intersection-observer
  opacity: 0;
  transform: translateY(3rem);
  transition: transform .8s;
  ${({ $inView }) => {
    if ($inView === true) {
      return css`
        opacity: 1;
        transform: translateY(0);
      `
    }
  }};
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const ServiceInfo = styled.div`
  display: inline-block;
  vertical-align: top;
  position: sticky;
  top: 1rem; // TODO
  width: 50%;
`

const ServiceTitle = styled.h2`
  text-transform: uppercase;
  font-weight: 300;
  margin: 0;
`

const ServiceDescription = styled.p`
  padding: 0 10vw 0 0;
`

const ServiceImage = styled.img`
  display: inline-block;
  width: 50%;
  height: 60svh; // TODO
`

const ServiceSection = component(({ name, to }) => {
  const { t } = useTranslation(name)
  const { ref, inView } = useInView()
  const [isVisible, setIsVisible] = useState(inView)
  useEffect(() => {
    if (isVisible === false && inView === true) {
      setIsVisible(inView)
    }
  })

  return (
    <StyledLink to={to}>
      <StyledSection ref={ref} $inView={isVisible}>
        <ServiceInfo>
          <ServiceTitle>{t('title')}</ServiceTitle>
          <ServiceDescription>{t('description')}</ServiceDescription>
        </ServiceInfo>
        <ServiceImage />
      </StyledSection>
    </StyledLink>
  )
})

export default ServiceSection
