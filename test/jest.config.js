module.exports = {
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  coverageDirectory: './coverage',
  moduleDirectories: ['node_modules'],
  testRegex: '.*\\/.*\\.spec\\.js$',
  snapshotSerializers: [],
};
