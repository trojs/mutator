import { expect, describe, it } from '@jest/globals';
import { capitalizeWords } from '../string-helper.js';

const testCases = [
    {
        description: 'It should capitalize words',
        input: 'test',
        expectedResult: 'Test',
    },
    {
        description: 'It should capitalize "test_test_test"',
        input: 'test_test_test',
        expectedResult: 'TestTestTest',
    },
    {
        description: 'It should capitalize "test test test"',
        input: 'test test test',
        expectedResult: 'TestTestTest',
    },
    {
        description: 'It should capitalize "tEst teSt tesT"',
        input: 'tEst teSt tesT',
        expectedResult: 'TEstTeStTesT',
    },
];

describe.each(testCases)(
    'Test the item filter method',
    ({ description, input, expectedResult }) => {
        it(description, () => {
            const result = capitalizeWords(input);
            expect(result).toEqual(expectedResult);
        });
    }
);
