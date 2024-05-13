import { describe, expect, test } from 'bun:test'

import { getTitle } from './utils'
import { titles } from './titles'

describe('getTitle', () => {
  test("Should return the fallback title when `seoString` isn't a key of `titles`", () => {
    expect(getTitle('absolutely_missing', 'en')).toBe(titles.fallback)
  })

  test('Should return the `en` title for `home`', () => {
    expect(getTitle('home', 'en')).toBe(titles.home.en)
  })

  test("Should return the fallback title when `xx` isn't a language of `titles.home`", () => {
    expect(getTitle('home', 'xx')).toBe(titles.fallback)
  })
})
