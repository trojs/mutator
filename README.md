# Mutate the value when set some data

[![NPM version][npm-image]][npm-url]

With this package you can define some setters that are optional.
So it change the value for the defined setters, but if you don't pass the key, it doesnt set the key.

## Installation

`npm install @trojs/objects`
or
`yarn add @trojs/objects`

## Test the package

`npm run test`
or
`yarn test`

## Example usage

```javascript
import DefaultMutator from '@trojs/mutator'

class ExampleMutator extends DefaultMutator {
  setSkuAttribute (sku) {
    return `*${sku}*`
  }
}

const result = ExampleMutator.create({ sku: '42', test: 'ok' })
{
    sku: '*42*',
    test: 'ok'
}

const result = ExampleMutator.create({ sku: '42' })
{
    sku: '*42*'
}

const result = ExampleMutator.create({ test: 'ok' })
{
    test: 'ok'
}
```

You can also hydrate the object with new data

```javascript
const result = ExampleMutator.create({ test: 'ok', test2: 'also ok' })
{
    test: 'ok',
    test2: 'also ok'
}

result.hydrate({ sku: 43})
{
    test: 'ok',
    test2: 'also ok',
    sku: '*43*'
}

result.hydrate({ test: 'another text'})
{
    test: 'another text',
    test2: 'also ok',
    sku: '*43*'
}
```

[npm-url]: https://www.npmjs.com/package/@trojs/mutator
[npm-image]: https://img.shields.io/npm/v/@trojs/mutator.svg
