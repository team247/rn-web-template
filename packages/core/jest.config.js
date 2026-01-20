const baseConfig = require('@app/jest-config/base');

/** @type {import('jest').Config} */
module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.ts'],
  moduleNameMapper: {
    ...baseConfig.moduleNameMapper,
    '^@app/core$': '<rootDir>/src',
    '^@app/core/(.*)$': '<rootDir>/src/$1',
  },
};
