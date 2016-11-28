/**
 * Created by Alvin on 2016/11/18.
 */

var express = require('express');
// 引入body-parser和serve-static，在4+版本中中间件需要单独引入
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var morgan = require('morgan');
// Linux下在控制台使用PORT=4000 node app.js就会使用4000这个端口而不是3000
// Windows下需要先设置端口set Port = 1234，然后node app.js
var port = process.env.PORT || 3000;
var app = express();
var dburl = 'mongodb://localhost/movie';

// 连接mongodb
mongoose.connect(dburl);

// 视图路径
app.set('views', './app/views/pages');
// 模板引擎
app.set('view engine', 'jade');
// 将表单的字段解析为json
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true}));
// 设置静态文件目录
app.use(serveStatic('public'));
// 使用会话
app.use(cookieParser());
app.use(session({
    secret: 'imooc',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        url: dburl,
        collection: 'session'
    })
}));
// 设置一个全局的函数moment用于格式化日期
app.locals.moment = require('moment');
// 监听端口
app.listen(port);

// 开发环境在控制台输出信息
if ('development' === app.get('env')) {
    app.set('showStackError', true);
    app.use(morgan(':method :url :status :response-time ms'));
    app.locals.pretty = true;
    mongoose.set('debug', true);
}

// 路由处理
require('./config/router')(app);

console.log('movie is running at port ' + port);


