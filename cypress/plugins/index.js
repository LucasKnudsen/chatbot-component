module.exports = (on, config) => {
  config.env.parameters = {
    // get AWS credentials from environment variables set by Amplify build
  }
  return config
}
