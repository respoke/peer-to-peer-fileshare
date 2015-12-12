'use strict';
var config = require('config');
var Respoke = require('respoke-admin');
var respoke = new Respoke({
    'App-Secret': config.get('respokeAppSecret')
});
module.exports = (app) => {
    app.get('/', (req, res) => res.render('index'));
    app.get('/rooms/:room', (req, res, next) => {
        let id = Math.random().toString(36).substring(2);
        let {room} = req.params;
        respoke.auth.endpoint({
            endpointId: id,
            roleId: config.get('respokeRoleId'),
            appId: config.get('respokeAppId')
        }, (err, data) => {
            if (err) { return next(err); }
            let {tokenId} = data;
            res.render('room', {
                room,
                tokenId,
                id
            });
        });
    });
};
