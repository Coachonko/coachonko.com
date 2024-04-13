import { hydrateRoot } from '@dark-engine/platform-browser'
import { Translator } from '@wareme/translations'

import { getMessages } from './translations'
import App from './components/App'

const currentLanguage = document.documentElement.lang
const messages = await getMessages(currentLanguage)
const translator = new Translator(currentLanguage, messages)

hydrateRoot(
  document.getElementById('dark-root'),
  <App translator={translator} />
)
