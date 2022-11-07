// This file was automatically added by edgio deploy.
// You should commit this file to source control.

module.exports = {
  server: {
    path: "dist/server.js",
  },
  backends: {
    commerce: {
      domainOrIp: "{answers.origin}",
      hostHeader: "{answers.origin}",
    },
  },
};
