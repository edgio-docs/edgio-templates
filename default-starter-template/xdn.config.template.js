module.exports = {
  routes: './src/routes.ts',
  connector: '@xdn/starter',
  backends: {
    origin: {
      domainOrIp: '{answers.origin}',
      hostHeader: '{answers.origin}',
    },
  },
}
