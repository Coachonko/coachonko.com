import { component, detectIsNull } from '@dark-engine/core'

import { config } from '../../shared/config'
import { getHomePath } from '../../shared/routes'

const services = [
  'delivery'
]

function isServicePage (metaKey) {
  for (let i = 0, len = services.length; i < len; i++) {
    if (metaKey === services[i]) {
      return true
    }
  }
  return false
}

function serviceBreadcrumb (metaKey, currentPath, currentLanguage) {
  const homePath = getHomePath(currentLanguage)
  const servicesPath = `${homePath}services`

  return {
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'services',
        item: `${config.BASE_URL}${servicesPath}`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: metaKey,
        item: `${config.BASE_URL}${currentPath}`
      }
    ]
  }
}

function getServiceLinkedData (metaKey, currentPath, currentLanguage, description) {
  return {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'Service',
      areaServed: 'Europe',
      // TODO
      // audience
      // availableChannel
      // isRelatedTo

      // from Thing
      description
    },
    {
      '@type': 'WebPage',
      breadcrumb: serviceBreadcrumb(metaKey, currentPath, currentLanguage)
    }]
  }
}

function linkedDataScriptTag (data) {
  return <script type='application/ld+json' __danger={JSON.stringify(data)} />
}

function getContactLinkedData (description) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Store',
    // image: `${config.BASE_URL}/_public/idk`,
    // logo:  `${config.BASE_URL}/_public/idk`,
    url: config.BASE_URL,
    name: config.NAME,
    alternateName: `${config.NAME} ${config.TAGLINE}`,
    legalName: config.LEGAL_NAME,
    description,
    telephone: config.CONTACT_PHONE,
    email: config.CONTACT_EMAIL,
    vatID: config.VAT_ID,
    address: {
      '@type': 'PostalAddress',
      streetAddress: config.ADDRESS_STREET,
      addressLocality: config.ADDRESS_CITY,
      postalCode: config.ADDRESS_ZIP,
      addressCountry: config.ADDRESS_COUNTRY
      // geo: {latitude: , longitude: }
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: config.CONTACT_PHONE,
      email: config.CONTACT_EMAIL
    },
    // numberOfEmployees:
    // foundingDate:
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '09:00',
        closes: '12:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '15:00',
        closes: '19:00'
      }
    ],
    sameAs: [
      `https://instagram.com/${config.INSTAGRAM_USERNAME}`,
      `https://facebook.com/${config.FACEBOOK_USERNAME}`,
      `https://twitter.com/${config.TWITTER_USERNAME}`
    ],
    areaServed: 'Europe'
  }
}

const LinkedData = component(({ metaKey, currentPath, currentLanguage, description }) => {
  if (detectIsNull(metaKey)) {
    return null
  }

  if (metaKey === 'contact') {
    const data = getContactLinkedData(description)
    return linkedDataScriptTag(data)
  }

  if (isServicePage(metaKey)) {
    const data = getServiceLinkedData(metaKey, currentPath, currentLanguage, description)
    return linkedDataScriptTag(data)
  }

  return null
})

export default LinkedData
