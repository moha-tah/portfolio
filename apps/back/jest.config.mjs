/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
  moduleDirectories: ['node_modules', '<rootDir>/src'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.(ts|tsx)$',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          esModuleInterop: true
        }
      }
    ]
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  // Ignore compiled JS mocks in the dist directory to prevent duplicate manual mock errors
  modulePathIgnorePatterns: ['<rootDir>/dist/.*__mocks__.*\\.js$'],
  setupFiles: ['<rootDir>/src/jest.setup.ts'],
  maxWorkers: 4,
  moduleNameMapper: {
    '^resources/(.*)$': '<rootDir>/src/resources/$1'
  }
}

export default config
