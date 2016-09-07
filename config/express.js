'use strict';

const
    express         = require('express'),
    glob            = require('glob'),
    favicon         = require('serve-favicon'),
    logger          = require('morgan'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    compress        = require('compression'),
    methodOverride  = require('method-override'),
    path            = require('path'),
    appRoot         = require('app-root-path'),
    walk            = require('express-walk'),
    exphbs          = require('express-handlebars');

module.exports = function (app, config) {
    /**
     * env를 development로 설정
     */
    let env = process.env.NODE_ENV || 'development';
    app.locals.ENV = env;
    app.locals.ENV_DEVELOPMENT = env == 'development';

    /**
     * template 엔진을 handlebar로 설정
     */
    app.engine('handlebars', exphbs({
        layoutsDir: config.root + '/app/views/layouts/',
        defaultLayout: 'main',
        partialsDir: [config.root + '/app/views/partials/']
    }));
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'handlebars');

    app.use(favicon(path.join(appRoot.path, 'client/dist/favicon.ico')));
    app.use(logger('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(cookieParser());
    app.use(compress());

    app.use(express.static(path.join(appRoot.path, 'client/dist')));

    app.use(methodOverride());

    app.use(walk(path.join(appRoot.path, 'app/controllers')));

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    });

};
