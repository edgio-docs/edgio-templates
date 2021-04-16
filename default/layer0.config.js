module.exports = {
  routes: './src/routes.ts',
  connector: '@layer0/starter',
  backends: {
    origin: {
      domainOrIp: 'moovdemo.myshopify.com',
      hostHeader: 'moovdemo.myshopify.com',
    },
  },
}
