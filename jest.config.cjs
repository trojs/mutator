module.exports = {
    moduleFileExtensions: ['js', 'jsx', 'json'],

    transformIgnorePatterns: ['node_modules/(?!(@hckrnews|@htrojs)/)'],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },

    testMatch: ['**/__tests__/*.js'],

    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js']
}
