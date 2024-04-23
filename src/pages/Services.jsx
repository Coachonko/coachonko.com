import { component } from '@dark-engine/core'
import { useTranslation } from '@wareme/translations'

const Services = component(({ slot }) => {
  const { t } = useTranslation()
  return (
    <section>
      services
      {slot}
    </section>
  )
})

export default Services
