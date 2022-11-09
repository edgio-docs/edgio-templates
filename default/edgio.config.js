module.exports = {
  routes: './src/routes.ts',
  connector: '@edgio/starter',
  backends: {
    origin: {
      domainOrIp: 'edg.io',
      hostHeader: 'edg.io',
    },
  },
}
