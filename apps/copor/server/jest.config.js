// Runs every server package's tests in the context of this app: the setup
// files register all of the app's modules, as the server does at startup.
const packages = '<rootDir>/../../../packages';
const moduleNameMapper = {
    '^@copor/([^/]+)/(.*)$': `${packages}/$1/server/src/$2`,
};
const transform = {
    '^.+\\.tsx?$': ['ts-jest', {tsconfig: '<rootDir>/tsconfig.json', diagnostics: {ignoreCodes: [151002]}}],
};

module.exports = {
    projects: [
        {
            displayName: 'domain',
            rootDir: __dirname,
            testEnvironment: 'node',
            roots: [packages, '<rootDir>/test'],
            testMatch: [`${packages}/*/server/src/domain/__tests__/**/*.ts`, '<rootDir>/test/domain/**/*.test.ts'],
            setupFilesAfterEnv: ['<rootDir>/test/domain/jest.setup.ts'],
            moduleNameMapper,
            transform,
        },
        {
            displayName: 'client',
            rootDir: __dirname,
            testEnvironment: 'node',
            roots: [packages, '<rootDir>/test'],
            testMatch: [`${packages}/*/server/src/client/__test__/**/*.test.ts`, '<rootDir>/test/client/**/*.test.ts'],
            setupFilesAfterEnv: ['<rootDir>/test/client/jest.setup.ts'],
            moduleNameMapper,
            transform,
        },
    ],
};
