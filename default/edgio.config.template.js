module.exports = {
  routes: './src/routes.ts',
  connector: '@edgio/starter',
  backends: {
    origin: {
      domainOrIp: '{answers.origin}',
      hostHeader: '{answers.origin}',
    },
  },
}
