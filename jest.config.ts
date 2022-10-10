// jest.config.js
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    roots: ["<rootDir>/spec/javascript/components"],
    setupFilesAfterEnv: ["<rootDir>/spec/javascript/components/setupTests.ts"],
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
    testMatch: [
        "<rootDir>/spec/javascript/components/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/spec/javascript/components/**/*.{spec,test}.{js,jsx,ts,tsx}",
    ],
    testEnvironment: "jsdom",
    preset: "ts-jest",
    globals: {
        "ts-jest": {
            isolatedModules: true,
        },
    },
    transform: {
        "\\.(ts|js)x?$": "ts-jest",
    },
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$",
    ],
    resetMocks: true,
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
            "identity-obj-proxy",
        "\\.svg$": "<rootDir>/__mocks__/svg.js",
        "~(.*)$": "<rootDir>/spec/javascript/components/$1",
    },
    moduleDirectories: ["node_modules", "<rootDir>/node_modules", "."],
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname",
    ],
    testTimeout: 10000, // optional
};

module.exports = config;