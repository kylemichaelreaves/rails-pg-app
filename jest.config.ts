// jest.config.js
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
    verbose: true,
    roots: ["<rootDir>/spec/javascript/components"],
    setupFiles: ["<rootDir>/spec/javascript/jest.polyfills.js"],
    setupFilesAfterEnv: ["<rootDir>/spec/javascript/components/setupTests.ts"],
    collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}", "!src/**/*.d.ts"],
    coveragePathIgnorePatterns: ["<rootDir>/node_modules/"],
    testMatch: [
        "<rootDir>/spec/javascript/components/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/spec/javascript/components/**/*.{spec,test}.{js,jsx,ts,tsx}",
    ],
    testEnvironment: "jsdom",
    // MSW v2 ships ESM for the browser export condition, which jest can't parse.
    // Resetting export conditions makes jsdom resolve MSW's node/CJS build.
    testEnvironmentOptions: {
        customExportConditions: [""],
    },
    preset: "ts-jest",
    transform: {
        // Our tsconfig targets ESM (module: esnext) for Vite; override to CommonJS
        // for jest so ts-jest emits CJS that the (CJS) jest runtime can execute.
        "^.+\\.(m?[jt]sx?)$": ["ts-jest", {tsconfig: {module: "commonjs"}}],
    },
    // MSW v2 and several of its deps ship ESM (.mjs) with no CJS fallback, so they
    // must be transformed rather than ignored like the rest of node_modules.
    transformIgnorePatterns: [
        "node_modules/(?!(msw|@mswjs|@open-draft|@bundled-es-modules|until-async|strict-event-emitter|outvariant|headers-polyfill|is-node-process|graphql|rettime)/)",
    ],
    resetMocks: true,
    moduleNameMapper: {
        ".+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$":
            "identity-obj-proxy",
        "\\.svg$": "<rootDir>/__mocks__/svg.js",
        // App code aliases "~/..." to app/javascript (matches tsconfig paths + vite).
        "^~/(.*)$": "<rootDir>/app/javascript/$1",
    },
    moduleDirectories: ["node_modules", "<rootDir>/node_modules", "."],
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname",
    ],
    testTimeout: 10000, // optional
};

module.exports = config;