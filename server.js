'use strict';

var express = require('express'),
    app = express();

app.set('port', (process.env.PORT || 8080));
//app.use(express.static('dist'));

app.listen(app.get('port'), function () {
    console.log('JHRSeguros is running on port', app.get('port'));
});