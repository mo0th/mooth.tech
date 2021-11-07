/* eslint-disable @typescript-eslint/no-var-requires */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { withPlausibleProxy } = require('next-plausible')

const withPlausibleConfig = withPlausibleProxy({
  scriptName: 'plausible',
  customDomain: 'https://plausible.mooth.tech',
})

/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */
const config = {
  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
}

module.exports = withPlausibleConfig(withBundleAnalyzer(config))
