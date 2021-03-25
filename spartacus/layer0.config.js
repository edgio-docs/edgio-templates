// This file was automatically added by layer0 deploy.
// You should commit this file to source control.

module.exports = {
  server: {
    path: "dist/server.js",
  },
  connector: "@layer0/spartacus",
  backends: {
    commerce: {
      domainOrIp: "aemspartacusapi.tmg.codes",
      hostHeader: "aemspartacusapi.tmg.codes",
    },
  },
};
