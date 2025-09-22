module.exports = function override(config, env) {
  // webpack-dev-server configuration
  if (config.devServer) {
    // Remove onAfterSetupMiddleware if it exists
    if (config.devServer.onAfterSetupMiddleware) {
      delete config.devServer.onAfterSetupMiddleware;
    }
    // Remove onBeforeSetupMiddleware if it exists (optional, but good practice)
    if (config.devServer.onBeforeSetupMiddleware) {
      delete config.devServer.onBeforeSetupMiddleware;
    }
  }
  return config;
};