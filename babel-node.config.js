// This configuration is based on the gatsby babel configuration:
// https://github.com/gatsbyjs/gatsby/blob/gatsby%402.10.0/packages/babel-preset-gatsby/src/index.js

const resolve = (m) => require.resolve(m)


module.exports = function config(api) {
  api.cache.never()

  return {
    presets: [
      [
        resolve('@babel/preset-env'),
        {
          targets: {
            node: 10,
          },
        },
      ],
      resolve('@babel/preset-react'),
    ],
    plugins: [
      resolve('@babel/plugin-proposal-class-properties'),
      resolve('@babel/plugin-syntax-dynamic-import'),

      // resolve src folder
      [
        resolve('babel-plugin-module-resolver'),
        {
          root: ['./src'],
        },
      ],
    ],
  }
}
