import dotenv from "dotenv";

dotenv.config({
  path: ["./apps/back/.env", "./apps/front/.env"],
});

/**
 * @type {import('ts-jest').JestConfigWithTsJest}
 */
const config = {
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  testEnvironment: "node",
  testRegex: ".*\\.spec\\.(ts|tsx)$",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          esModuleInterop: true,
        },
      },
    ],
  },
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  // Ignore compiled JS mocks in the dist directory to prevent duplicate manual mock errors
  modulePathIgnorePatterns: ["<rootDir>/dist/.*__mocks__.*\\.js$"],
  projects: [
    "apps/back/jest.config.mjs",
    "apps/front/jest.config.mjs",
    "packages/utils/jest.config.mjs",
  ],
};

export default config;
