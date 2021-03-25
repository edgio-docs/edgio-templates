module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: '{answers.origin}',
      hostHeader: '{answers.origin}',
    },
  },
}
