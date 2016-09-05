var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'express-react-webpack-redux'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/express-react-webpack-redux-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'express-react-webpack-redux'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/express-react-webpack-redux-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'express-react-webpack-redux'
    },
    port: process.env.PORT || 3000,
    db: 'mysql://localhost/express-react-webpack-redux-production'
  }
};

module.exports = config[env];
