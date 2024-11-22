import { describe, it } from 'node:test'
import assert from 'node:assert'
import { capitalizeWords } from '../string-helper.js'

const testCases = [
    {
        description: 'It should capitalize words',
        input: 'test',
        expectedResult: 'Test'
    },
    {
        description: 'It should capitalize "test_test_test"',
        input: 'test_test_test',
        expectedResult: 'TestTestTest'
    },
    {
        description: 'It should capitalize "test test test"',
        input: 'test test test',
        expectedResult: 'TestTestTest'
    },
    {
        description: 'It should capitalize "tEst teSt tesT"',
        input: 'tEst teSt tesT',
        expectedResult: 'TEstTeStTesT'
    }
]
describe('Test the item filter method', () => {

    testCases.forEach(
        ({ description, input, expectedResult }) => {
            it(description, () => {
                const result = capitalizeWords(input)
                assert.deepEqual(result, expectedResult)
            })
        }
    )

})
