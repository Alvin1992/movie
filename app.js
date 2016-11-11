/**
 * Created by Administrator on 2016/10/26.
 */

var express = require('express');
var app = express();

app.get('/test', function (req, res, next) {
    res.send('Hello World');
});

app.listen(8080);
