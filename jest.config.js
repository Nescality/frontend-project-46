module.exports = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  testMatch: ['<rootDir>/src/**/__tests__/**/*.test.js'],
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'clover'],
};
