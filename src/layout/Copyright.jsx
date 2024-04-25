import { component } from '@dark-engine/core'

import { config } from '../config'

const Copyright = component(() => {
  const copyrightYear = new Date().getFullYear()

  return <div>&#xa9; {copyrightYear} {config.NAME}</div>
})

export default Copyright
