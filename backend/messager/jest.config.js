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
		'^@domain/(.*)$': '<rootDir>/src/domain/$1',
		'^@aplication/(.*)$': '<rootDir>/src/aplication/$1',
		'^@infra/(.*)$': '<rootDir>/src/infra/$1',
		'^@main/(.*)$': '<rootDir>/src/main/$1',
		'^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
	},
	setupFiles: ['dotenv/config'],
}