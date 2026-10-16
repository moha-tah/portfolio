import path from 'node:path'

import { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
  // Force all user agents to receive blocking metadata
  htmlLimitedBots: /./,
  // workspace packages live above this app, so the bundler has to start from the monorepo root
  turbopack: { root: path.join(__dirname, '../..') },
  outputFileTracingRoot: path.join(__dirname, '../..'),
  transpilePackages: ['utils'],
  allowedDevOrigins: ['192.168.1.25'],
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
    formats: ['image/avif', 'image/webp']
  }
}

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: './messages/en.json'
  }
})

export default withNextIntl(nextConfig)
