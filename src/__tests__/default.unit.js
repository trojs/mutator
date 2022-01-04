import { expect, describe, it } from '@jest/globals';
import DefaultMutator from '../default.js';

class ExampleMutator extends DefaultMutator {
    setSkuAttribute(sku) {
        return `*${sku}*`;
    }

    setProductGroupAttribute(productGroup) {
        return `*${productGroup}*`;
    }

    setSubTestAttribute(value) {
        return `*${value}*`;
    }

    setSubFirstAttribute(value) {
        return value;
    }

    setSubLastAttribute(value) {
        return value;
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
            test7: 1,
        });
        expect({ ...result }).toEqual({
            test: 'ok',
            test5: false,
            test6: 0,
            test7: 1,
        });
    });

    it('It should set the item', () => {
        const result = ExampleMutator.create({ sku: 42, test: 'ok' });
        expect({ ...result }).toEqual({ sku: '*42*', test: 'ok' });
    });

    it('It should only call a setter', () => {
        const result = ExampleMutator.create({ sku: 42 });
        expect({ ...result }).toEqual({ sku: '*42*' });
    });

    it('It should handle the product_group', () => {
        const result = ExampleMutator.create({ product: { group: 'test' } });
        expect({ ...result }).toEqual({ product: { group: '*test*' } });
    });

    it('It should not call a setter', () => {
        const result = ExampleMutator.create({ test: 'ok', test2: 'also ok' });
        expect({ ...result }).toEqual({ test: 'ok', test2: 'also ok' });
    });

    it('It should hydrate the object with new data', () => {
        const result = ExampleMutator.create({ test: 'ok', test2: 'also ok' });
        expect({ ...result }).toEqual({ test: 'ok', test2: 'also ok' });
        result.hydrate({ sku: 43 });
        expect({ ...result }).toEqual({
            sku: '*43*',
            test: 'ok',
            test2: 'also ok',
        });
        result.hydrate({ test: 'another text' });
        expect({ ...result }).toEqual({
            sku: '*43*',
            test: 'another text',
            test2: 'also ok',
        });
    });

    it('It should set data', () => {
        const result = ExampleMutator.create({ test: 'ok', test2: 'also ok' });
        expect({ ...result }).toEqual({ test: 'ok', test2: 'also ok' });

        result.hydrate({ sku: 43 });
        expect({ ...result }).toEqual({
            sku: '*43*',
            test: 'ok',
            test2: 'also ok',
        });

        result.hydrate({ test: 'another text' });
        expect({ ...result }).toEqual({
            sku: '*43*',
            test: 'another text',
            test2: 'also ok',
        });
    });

    it('It should also mutate the sub fields', () => {
        const result = ExampleMutator.create({
            noMutation: 'ok',
            sub: {
                first: 1,
                test: 42,
                last: 99,
            },
        });
        expect({ ...result }).toEqual({
            noMutation: 'ok',
            sub: {
                first: 1,
                test: '*42*',
                last: 99,
            },
        });
    });

    it('It should handle the product_group', () => {
        const result = ExampleMutator.create({
            product: { group: 'test' },
            another: { test: 'ok' },
        });
        expect({ ...result }).toEqual({
            product: { group: '*test*' },
            another: { test: 'ok' },
        });
    });
});
