import { component, detectIsNull, detectIsUndefined } from '@dark-engine/core'

import { config } from '../../../src/config'

function scriptProps (data) {
  return {
    type: 'application/ld+json',
    __danger: JSON.stringify(data)
  }
}

const LinkedData = component(({ currentRoute }) => {
  if (detectIsNull(currentRoute)) {
    return null
  }

  const seoString = currentRoute.seo
  if (detectIsUndefined(seoString)) {
    return null
  }

  if (seoString === 'contact') {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      // additionalName
      // address
      // alumniOf
      // birthDate
      // birthPlace
      brand: {
        name: 'Coachonko'
        // description: ''
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'info@coachonko.com',
        // areaServed
        // hoursAvailable
        availableLanguage: ['English', 'Italian']
        // "contactType": "Customer Service"
      },
      // email
      // givenName
      // familyName
      // hasCertification
      // hasCredential
      // hasOccupation
      // hasOfferCatalog
      honorificPrefix: 'Mr.',
      honorificSuffix: ['BExSci', 'MClinExPhys'],
      // knowsAbout
      knowsLanguage: ['English', 'Italian'],
      // makesOffer
      // memberOf
      // nationality
      // taxID
      // vatID
      // workLocation
      // worksFor
      // inherited by Thing
      // name: '',
      // alternateName
      // description
      // image
      url: 'https://coachonko.com',
      sameAs: [
        `https://instagram.com/${config.INSTAGRAM_USERNAME}`,
        `https://facebook.com/${config.FACEBOOK_USERNAME}`,
        `https://twitter.com/${config.TWITTER_USERNAME}`
      ]
    }
    return <script {...scriptProps(data)} />
  }

  return null
})

export default LinkedData
