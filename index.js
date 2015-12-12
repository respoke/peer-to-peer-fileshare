var express = require('express');
var jade = require('jade').__express;
var config = require('config');
var routes = require('./routes');

var app = express();

app.enable('trust proxy');
app.engine('jade', jade);
app.set('view engine', '.jade');
app.use(express.static(__dirname + '/public'));
routes(app);
app.listen(config.get('port'), () => console.log('listening'));
