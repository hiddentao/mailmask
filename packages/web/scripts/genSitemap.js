#!/usr/bin/env node

const path = require('path')
const sitemap = require('nextjs-sitemap-generator')
const webpack = require('webpack')
const tmp = require('tmp')

const postsTmpDir = tmp.dirSync({ prefix: 'mailmask' }).name

const compiler = webpack({
  mode: 'none',
  entry: [ path.join(__dirname, '..', 'src', 'blog', 'index.js') ],
  module: {
    rules: [
      {
        test: /\.md$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '*', '.js', '.jsx' ],
  },
  output: {
    library: 'posts',
    libraryExport: 'default',
    libraryTarget: 'this',
    filename: 'posts.js',
    path: postsTmpDir,
  }
})

compiler.run(err => {
  if (err) {
    console.error(err)
    return
  }

  const { posts } = require(path.join(postsTmpDir, 'posts.js')) // eslint-disable-line import/no-dynamic-require

  sitemap({
    baseUrl: 'https://msk.sh',
    ignoreIndexFiles: true,
    ignoredPaths: [
      '/api',
      '/logged-in',
      '/await-email',
      '/dashboard',
      '/blog/[slug]'
    ],
    extraPaths: posts.map(({ slug }) => `/blog/${slug}`),
    pagesDirectory: path.resolve(__dirname, '../pages'),
    targetDirectory: path.resolve(__dirname, '../public'),
    nextConfigPath: path.resolve(__dirname, '../next.config.js'),
    ignoredExtensions: [
      'png',
      'jpg',
      'svg',
    ],
  })
})

