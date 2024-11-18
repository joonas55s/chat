
module.exports = {
	roots: ['<rootDir>/src', '<rootDir>/tests'],
	collectCoverageFrom: [
		'<rootDir>/src/**/*.{ts,tsx}',
		'!<rootDir>/src/main/**/*',
		'!<rootDir>/src/**/index.ts',
		'!**/*.d.ts'
	],
	coverageDirectory: 'coverage',
	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
	testPathIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/tests/e2e/cypress'
	],
	testEnvironment: 'jsdom',
	transform: {
		'.+\\.(ts|tsx)$': 'ts-jest'
	},
	'moduleNameMapper': {
		'^@domain/(.*)$': '<rootDir>/src/domain/$1',
		'^@aplication/(.*)$': '<rootDir>/src/aplication/$1',
		'^@infra/(.*)$': '<rootDir>/src/infra/$1',
		'^@main/(.*)$': '<rootDir>/src/main/$1',
		'^@presentation/(.*)$': '<rootDir>/src/presentation/$1',
		'^@shared/(.*)$': '<rootDir>/src/shared/$1'
	},
}