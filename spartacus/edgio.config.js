// This file was automatically added by edgio deploy.
// You should commit this file to source control.

module.exports = {
  server: {
    path: "dist/server.js",
  },
  connector: "@edgio/spartacus",
  backends: {
    commerce: {
      domainOrIp: "aemspartacusapi.tmg.codes",
      hostHeader: "aemspartacusapi.tmg.codes",
    },
  },
};
