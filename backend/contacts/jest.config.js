// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
	preset: 'ts-jest',
	verbose: true,
	testTimeout: 100000000,
	transform: tsjPreset.transform,
	transformIgnorePatterns: ['^.+\\.js$'],
	testMatch: ['**/?(*.)+(spec|test).ts?(x)'],
	resetMocks: true,
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
	},
	setupFiles: ['dotenv/config'],
}