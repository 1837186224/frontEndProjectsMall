module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-px-to-viewport': {
      // options   https://github.com/evrone/postcss-px-to-viewport/blob/master/README_CN.md
      viewportWidth: 375,
      viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false,
      exclude: [/TabBar/]
    }
  }
}