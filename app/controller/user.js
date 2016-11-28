/**
 * Created by Alvin on 2016/11/27.
 */

var User = require('../models/user');

// 注册页面
exports.showSignup = function (req, res) {
    res.render('signup', {
        title: '注册'
    });
};

// 登录页面
exports.showSignin = function (req, res) {
    res.render('signin', {
        title: '登录'
    });
};

// 注册
exports.signup = function (req, res) {
    var _user = req.body.user;

    User.findOne({name: _user.name}, function (err, data) {
        if (err) {
            console.log(err);
        }

        if (data) {
            return res.redirect('/signin');
        } else {
            var user = new User(_user);

            // 暂时不做校验
            user.save(function (err, user) {
                if (err) {
                    console.log(err);
                }

                res.redirect('/');
            })
        }
    });
};

// 登录
exports.signin = function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var pwd = _user.pwd;

    User.findOne({name: name}, function (err, user) {
        if (err) {
            console.log(err);
        }

        if (!user) {
            console.log('not exist');
            return res.redirect('/signup');
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
                return res.redirect('/signin');
            }
        });
    });
};

// 登出
exports.logout = function (req, res) {
    delete req.session.user;  // 删除会话信息
    res.redirect('/');
};

// 用户列表页
exports.list = function (req, res) {
    User.fetch(function (err, users) {
        if (err) {
            console.log(err);
        }

        res.render('userlist', {
            title: '用户列表页',
            users: users
        });
    });
};

// 是否登录
exports.signinRequired = function (req, res, next) {
    var user = req.session.user;

    if (!user) {
        return res.redirect('/signin');
    }

    next();
};

// 是否有管理员权限
exports.adminRequired = function (req, res, next) {
    var user = req.session.user;

    if (user.role <= 10) {
        return res.redirect('/signin');
    }

    next();
};
