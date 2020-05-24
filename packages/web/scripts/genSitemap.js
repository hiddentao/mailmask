#!/usr/bin/env node

const path = require('path')
const sitemap = require('nextjs-sitemap-generator')

sitemap({
  baseUrl: 'https://msk.sh',
  ignoreIndexFiles: true,
  ignoredPaths: [
    '/api',
    '/logged-in',
    '/await-email',
    '/dashboard'
  ],
  pagesDirectory: path.resolve(__dirname, '../pages'),
  targetDirectory: path.resolve(__dirname, '../public'),
  nextConfigPath: path.resolve(__dirname, '../next.config.js'),
  ignoredExtensions: [
    'png',
    'jpg',
    'svg',
  ],
})
