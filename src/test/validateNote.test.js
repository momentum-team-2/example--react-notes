/* globals describe, test, expect */
import validateNote from '../validateNote'

describe('validateNote', () => {
  test('validates note with text', () => {
    const [passes, errors] = validateNote({ text: 'test' })
    expect(passes).toBeTruthy()
  })

  test('note without text should not be valid', () => {
    const [passes, errors] = validateNote({})
    expect(passes).not.toBeTruthy()
    expect(errors.text).toEqual(['cannot be blank'])
  })

  test('note with text over 1000 chars is not valid', () => {
    const [passes, errors] = validateNote({
      text: 'a'.repeat(1001)
    })
    expect(passes).not.toBeTruthy()
    expect(errors.text).toEqual(['must be 1000 or less chars'])
  })
})
