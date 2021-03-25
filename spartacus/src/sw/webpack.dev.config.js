// DEV Webpack configuration used to build the service worker

const path = require("path");
const webpack = require("webpack");
const webBuildTargetFolder = path.join(__dirname, "..", "..", "dist", "xdn-spartacus");
const targetServiceWorkerFilename = "service-worker.js";

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  entry: {
    index: path.join(__dirname, "service-worker.ts"),
  },
  output: {
    path: webBuildTargetFolder,
    filename: targetServiceWorkerFilename,
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      XDN_PREFETCH_QUERY_PARAM: '__prefetch__',
      XDN_PREFETCH_CACHE_NAME: 'prefetch',
      XDN_HEADER_PREFETCH_QUERY_PARAM: '__header-prefetch__',
      BACKEND_REQUESTS_RESPONSE_HEADER_NAME: 'x-xdn-backend-requests',
      PREFETCH_HEADER_NAME: 'x-xdn-prefetch',
      XDN_PREFETCH_HEADER_VALUE: '1',
      NODE_ENV: 'production',
      DEEP_FETCH_HEADER_NAME: 'x-xdn-deep-prefetch'
    })
  ],
};
