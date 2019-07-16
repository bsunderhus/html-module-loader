module.exports = {
	roots: ['<rootDir>/src', '<rootDir>/tests', '<rootDir/dist>'],
	transform: {
		'^.+\\.[t|j]sx?$': 'babel-jest'
	}
}
