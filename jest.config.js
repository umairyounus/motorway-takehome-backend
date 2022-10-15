module.exports = {
  transform: {
    '^.+\\.(ts|tsx)$': [
      `ts-jest`,
      {
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },
  testEnvironment: 'node',
  testMatch: ['<rootDir>/(tests|src)/**/?(*.)+(spec|test).ts?(x)'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}'],
};
