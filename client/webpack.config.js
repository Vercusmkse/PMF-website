const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']
    }), // 👈 Add comma here!
    new NodePolyfillPlugin()
  ]
};
