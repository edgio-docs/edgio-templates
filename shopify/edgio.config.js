module.exports = {
  routes: './src/routes.ts',
  connector: '@edgio/starter',
  backends: {
    origin: {
      domainOrIp: 'moovdemo.myshopify.com',
      hostHeader: 'moovdemo.myshopify.com',
    },
  },
}
