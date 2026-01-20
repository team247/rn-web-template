const baseConfig = require('@app/jest-config/base');

/** @type {import('jest').Config} */
module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['@app/jest-config/setup'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^@app/ui$': '<rootDir>/src',
    '^@app/ui/(.*)$': '<rootDir>/src/$1',
  },
};
