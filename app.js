const
    express = require('express'),
    config  = require('./config/config'),
    db      = require('./app/models');

let app = express();

require('./config/express')(app, config);

/**
 * test 등의 외부에서 호출하는 경우,
 * module.parent가 존재하므로 실행x
 */
if(!module.parent) {
    db.sequelize
        .sync()
        .then(function () {
            app.listen(config.port, function () {
                console.log('Express server listening on port ' + config.port);
            });
        }).catch(function (e) {
        throw new Error(e);
    });
}

module.exports = app;