module.exports = {
  transform: { '^.+\\.(js|jsx)$': 'babel-jest' },
  modulePaths: ['src'],
  moduleFileExtensions: [ 'js', 'json', 'jsx' ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js'
  },
  transformIgnorePatterns: [ '/node_modules/' ],
  unmockedModulePathPatterns: [
    '<rootDir>/node_modules/react',
    '<rootDir>/node_modules/react-dom',
    '<rootDir>/node_modules/react-addons-test-utils'
  ],
  setupFiles: [
    'raf/polyfill',
    '<rootDir>/testSetup.js'
  ]
};
