# Mutate the value when set some data

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coveralls Status][coveralls-image]][coveralls-url] [![Scrutinizer Code Quality][scrutinizer-image]][scrutinizer-url]

With this package you can define some setters that are optional.
So it change the value for the defined setters, but if you don't pass the key, it doesnt set the key.

## Installation

`npm install @hckrnews/objects`
or
`yarn add @hckrnews/objects`

## Test the package

`npm run test`
or
`yarn test`

## Example usage

```javascript
import DefaultMutator from '@hckrnews/mutator'

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

[npm-url]: https://www.npmjs.com/package/@hckrnews/mutator
[npm-image]: https://img.shields.io/npm/v/@hckrnews/mutator.svg
[travis-url]: https://travis-ci.org/hckrnews/mutator
[travis-image]: https://img.shields.io/travis/hckrnews/mutator/main.svg
[coveralls-url]: https://coveralls.io/r/hckrnews/mutator
[coveralls-image]: https://img.shields.io/coveralls/hckrnews/mutator/main.svg
[scrutinizer-url]: https://scrutinizer-ci.com/g/hckrnews/mutator/?branch=main
[scrutinizer-image]: https://scrutinizer-ci.com/g/hckrnews/mutator/badges/quality-score.png?b=main
