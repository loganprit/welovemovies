const webpack = require("webpack");

/**
 * Webpack configuration override for React app
 * Adds polyfills and loaders required for the application
 *
 * @param {Object} config - Original webpack config
 * @returns {Object} Modified webpack config
 */
module.exports = function override(config) {
  // Configure polyfill fallbacks
  const polyfillFallbacks = {
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    url: require.resolve("url"),
    util: require.resolve("util"),
  };

  // Apply fallbacks to config
  config.resolve.fallback = {
    ...(config.resolve.fallback || {}),
    ...polyfillFallbacks,
  };

  // Add required plugins
  config.plugins = [
    ...(config.plugins || []),
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    }),
  ];

  // Add markdown loader for .md files
  config.module.rules.push({
    test: /\.md$/,
    use: "raw-loader",
  });

  return config;
};
