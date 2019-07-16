module.exports = {
	roots: ['<rootDir>/src', '<rootDir>/tests'],
	transform: {
		'^.+\\.[t|j]sx?$': 'babel-jest'
	},
	collectCoverageFrom: ["src/*.ts"]
}
