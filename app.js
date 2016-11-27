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
var Movie = require('./models/movie');
var User = require('./models/user');
var _ = require('underscore');
// Linux下在控制台使用PORT=4000 node app.js就会使用4000这个端口而不是3000
// Windows下需要先设置端口set Port = 1234，然后node app.js
var port = process.env.PORT || 3000;
var app = express();
var dburl = 'mongodb://localhost/movie';

// 连接mongodb
mongoose.connect(dburl);

// 视图路径
app.set('views', './views/pages');
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

console.log('movie is running at port ' + port);

// 首页
app.get('/', function (req, res) {
    console.log('session', req.session.user);
    // 将会话信息保存为全局可用的变量
    app.locals.user = req.session.user;
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            title: 'movie首页',
            movies: movies
        });
    });
});

app.get('/index', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            title: 'movie首页',
            movies: movies
        });
    });
});

// 注册
app.post('/user/signup', function (req, res) {
    var _user = req.body.user;

    User.findOne({name: _user.name}, function (err, data) {
        if (err) {
            console.log(err);
        }

        if (data) {
            return res.redirect('/');
        } else {
            var user = new User(_user);

            // 暂时不做校验
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/admin/userlist');
            })
        }
    });
});

// 登录
app.post('/user/signin', function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var pwd = _user.pwd;

    User.findOne({name: name}, function (err, user) {
        if (err) {
            console.log(err);
        }

        if (!user) {
            console.log('not exist');
            return res.redirect('/');
        }
        user.comparePassword(pwd, function (err, isMatch) {
            if (err) {
                console.log(err);
            }
            console.log('isMatch', isMatch);
            if (isMatch) {
                console.log('Password is correct');
                req.session.user = user;
                return res.redirect('/');
            } else {
                console.log('Password is incorrect');
            }
        });
    });
});

// 登出
app.get('/logout', function (req, res) {
    delete req.session.user;  // 删除会话信息
    res.redirect('/');
});

// 用户列表页
app.get('/admin/userlist', function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }

        res.render('userlist', {
            title: '用户列表页',
            users: users
        });
    });
});

// 详情页
app.get('/movie/:id', function (req, res) {
    var id = req.params.id;
    Movie.findById(id, function (err, movie) {
        res.render('detail', {
            title: movie.title,
            movie: movie
        });
    });
});

// 后台录入页面
app.get('/admin/movie', function (req, res) {
    res.render('admin', {
        title: '后台录入',
        movie: {
            title: '',
            director: '',
            country: '',
            year: '',
            poster: '',
            flash: '',
            summary: '',
            language: ''
        }
    });
});

// 更新页
app.get('/admin/update/:id', function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: 'movie后台更新页面',
                movie: movie
            });
        });
    }
});

// 后台录入的接口
app.post('/admin/movie/new', function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    if (id !== "undefined") {
        // 更新数据
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }

            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/movie/' + movie.id);
            });
        });
    } else {
        _movie = new Movie({
            director: movieObj.director,
            title: movieObj.title,
            country: movieObj.country,
            language: movieObj.language,
            year: movieObj.year,
            poster: movieObj.poster,
            summary: movieObj.summary,
            flash: movieObj.flash
        });

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }

            res.redirect('/movie/' + movie.id);
        });
    }
});

// 电影列表页
app.get('/admin/list', function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('list', {
            title: 'movie列表页',
            movies: movies
        });
    });
});

// 删除接口
app.delete('/admin/list', function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({_id: id}, function (err, movie) {
            if (err) {
                console.log(err);
            } else {
                res.json({success: 1});
            }
        })
    }
});
