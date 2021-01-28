/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1611744544968_1506';

  // add your middleware config here
  config.middleware = [];

  config.security = {
    csrf: {
      enable: false,
      // headerName: 'x-csrf-token',
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  const mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      // enter your password and username
      user: 'root',
      password: '',
      database: 'final',
    },
    app: true,
    agent: false,
  };

  const swaggerdoc = {
    dirScanner: './app/controller',
    basePath: '/api/v1',
    apiInfo: {
      title: 'egg-swagger',
      description: 'Ali final work',
      version: '1.0.0',
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    securityDefinitions: {
    },
    enableSecurity: false,
    routerMap: false,
    enable: true,
  };

  return {
    ...config,
    ...userConfig,
    mysql,
    swaggerdoc,
  };
};
