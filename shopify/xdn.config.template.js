module.exports = {
  routes: './src/routes.ts',
  backends: {
    origin: {
      domainOrIp: '{answers.origin}',
      hostHeader: '{answers.origin}',
    },
  },
}
