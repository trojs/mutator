import { describe, it } from 'node:test'
import assert from 'node:assert'
import DefaultMutator from '../default.js'
class ExampleMutator extends DefaultMutator {
    setSkuAttribute (sku) {
        return `*${sku}*`
    }

    setProductGroupAttribute (productGroup) {
        return `*${productGroup}*`
    }

    setSubTestAttribute (value) {
        return `*${value}*`
    }

    setSubFirstAttribute (value) {
        return value
    }

    setSubLastAttribute (value) {
        return value
    }
}

describe('Test the filter mutator', () => {
    it('It should skip empty values', () => {
        const result = DefaultMutator.create({
            test: 'ok',
            test2: null,
            test3: undefined,
            test4: NaN,
            test5: false,
            test6: 0,
            test7: 1
        })
        assert.deepEqual({ ...result }, {
            test: 'ok',
            test5: false,
            test6: 0,
            test7: 1
        })
    })

    it('It should set the item', () => {
        const result = ExampleMutator.create({ sku: 42, test: 'ok' })
        assert.deepEqual({ ...result }, { sku: '*42*', test: 'ok' })
    })

    it('It should set the item only if the value isnt null', () => {
        const result = ExampleMutator.create({
            sku: null,
            test: 'ok',
            test2: null
        })
        assert.deepEqual({ ...result }, { test: 'ok' })
    })

    it('It should only call a setter', () => {
        const result = ExampleMutator.create({ sku: 42 })
        assert.deepEqual({ ...result }, { sku: '*42*' })
    })

    it('It should handle the product.group', () => {
        const result = ExampleMutator.create({ product: { group: 'test' } })
        assert.deepEqual({ ...result }, { product: { group: '*test*' } })
    })

    it('It should handle the product_group', () => {
        const result = ExampleMutator.create({ product_group: 'test' })
        assert.deepEqual({ ...result }, { product_group: '*test*' })
    })

    it('It should not call a setter', () => {
        const result = ExampleMutator.create({ test: 'ok', test2: 'also ok' })
        assert.deepEqual({ ...result }, { test: 'ok', test2: 'also ok' })
    })

    it('It should hydrate the object with new data', () => {
        const result = ExampleMutator.create({ test: 'ok', test2: 'also ok' })
        assert.deepEqual({ ...result }, { test: 'ok', test2: 'also ok' })
        result.hydrate({ sku: 43 })
        assert.deepEqual({ ...result }, {
            sku: '*43*',
            test: 'ok',
            test2: 'also ok'
        })
        result.hydrate({ test: 'another text' })
        assert.deepEqual({ ...result }, {
            sku: '*43*',
            test: 'another text',
            test2: 'also ok'
        })
    })

    it('It should also mutate the sub fields', () => {
        const result = ExampleMutator.create({
            noMutation: 'ok',
            sub: {
                first: 1,
                test: 42,
                last: 99
            }
        })
        assert.deepEqual({ ...result },{
            noMutation: 'ok',
            sub: {
                first: 1,
                test: '*42*',
                last: 99
            }
        })
    })

    it('It should handle the product_group', () => {
        const result = ExampleMutator.create({
            product: { group: 'test' },
            another: { test: 'ok' }
        })
        assert.deepEqual({ ...result },{
            product: { group: '*test*' },
            another: { test: 'ok' }
        })
    })
})
