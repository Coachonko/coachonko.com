import { component } from '@dark-engine/core'
import { useLocation } from '@dark-engine/web-router'
import { styled } from '@dark-engine/styled'
import { useTranslation } from '@wareme/translations'

import ServiceSection from '../components/ServiceSection'

const Title = styled.h1`
  font-weight: 300;
  font-size: 9.6vw;
  line-height: .9;
  margin: 0 2.5vw;
  padding: 0 0 2svh;
  border-bottom: var(--border-style);
`

const servicesNames = [
  'delivery'
]

const servicesComponents = (pathname) => {
  const res = []
  for (let i = 0, len = servicesNames.length; i < len; i++) {
    const name = servicesNames[i]
    res.push(<ServiceSection name={name} to={`${pathname}/${name}`} />)
  }
  return res
}

const Services = component(() => {
  const { t } = useTranslation('services')
  const { pathname } = useLocation()

  const services = servicesComponents(pathname)

  return (
    <>
      <Title>{t('title')}</Title>
      {services}
    </>
  )
})

export default Services
