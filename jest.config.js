const webpackConfig = require('./webpack.config.js')


module.exports = {
  transform: {
    '^.+\\.jsx?$': '<rootDir>/internals/jest/preprocess.js',
  },
  moduleDirectories: webpackConfig.resolve.modules,
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
  },
  testPathIgnorePatterns: ['node_modules', '.cache', 'public', 'lambda'],
  transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],
  globals: {
    __PATH_PREFIX__: '',
  },
  testURL: 'http://localhost',
  setupFiles: ['<rootDir>/internals/jest/loadershim.js'],
}
