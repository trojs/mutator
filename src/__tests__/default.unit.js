import { expect, describe, it } from '@jest/globals'
import DefaultMutator from '../default.js'

class ExampleMutator extends DefaultMutator {
    setSkuAttribute (sku) {
      this.sku = `*${sku}*`
    }
  }

describe('Test the filter mutator', () => {
  it('It should skip empty values', () => {
    const result = DefaultMutator.create({ test: 'ok', test2: null, test3: undefined, test4: NaN, test5: false, test6: 0, test7: 1 })
    expect({ ...result }).toEqual({ test: 'ok', test5: false, test6: 0, test7: 1 })
  })

  it('It should set the item', () => {
    const result = ExampleMutator.create({ sku: 42, test: 'ok' })
    expect({ ...result }).toEqual({ sku: '*42*', test: 'ok' })
  })

  it('It should only call a setter', () => {
    const result = ExampleMutator.create({ sku: 42 })
    expect({ ...result }).toEqual({ sku: '*42*' })
  })

  it('It should not call a setter', () => {
    const result = ExampleMutator.create({ test: 'ok', test2: 'also ok' })
    expect({ ...result }).toEqual({ test: 'ok', test2: 'also ok' })
  })
})
