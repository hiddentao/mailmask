const path = require('path')
const withImages = require('next-images')

module.exports = withImages({
  exclude: path.resolve(__dirname, 'src/frontend/images/svg'),
  env: require('./src/config'),
  webpack: config => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    )

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'react-svg-loader'
        }
      ],
    })

    return config
  }
})
