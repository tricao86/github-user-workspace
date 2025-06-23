module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/__tests__/setupTests.ts"],
  testMatch: ["<rootDir>/src/__tests__/**/*.(spec|test).(ts|tsx)"],
  moduleNameMapper: {
    "^@app/(.*)$": "<rootDir>/src/app/$1",
    "^@features/(.*)$": "<rootDir>/src/features/$1",
    "^@shared/(.*)$": "<rootDir>/src/shared/$1",
    "^@locales/(.*)$": "<rootDir>/src/locales/$1",
  },
  transformIgnorePatterns: [
    "/node_modules/",
    "!@schedulo/github-user-core-lib",
  ],
};
