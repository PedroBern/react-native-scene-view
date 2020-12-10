module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            MY_PACKAGE_NAME_HERE: '../src/index',
          },
        },
      ],
    ],
  }
}
