/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
  },
  distDir: './dist', // Changes the build output directory to `./dist/`.
}

module.exports = nextConfig
