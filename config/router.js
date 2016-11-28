/**
 * Created by Alvin on 2016/11/27.
 */

var Index = require('../app/controller/index');
var User = require('../app/controller/user');
var Movie = require('../app/controller/movie');
var Comment = require('../app/controller/comment');


module.exports = function (app) {
    // 会话持久预处理
    app.use(function (req, res, next) {
        // 将会话信息保存为全局可用的变量
        app.locals.user = req.session.user;
        next();
    });

    // Index
    app.get('/', Index.index);  // 首页
    app.get('/index', Index.index);  // 首页

    // User
    app.post('/user/signup', User.signup);  // 注册
    app.post('/user/signin', User.signin);  // 登录
    app.get('/signin', User.showSignin);  // 登录页
    app.get('/signup', User.showSignup);  // 注册页
    app.get('/logout', User.logout);  // 登出
    app.get('/admin/userlist', User.signinRequired, User.adminRequired, User.list);  // 用户列表页

    // Movie
    app.get('/movie/:id', Movie.detail);  // 详情页
    app.get('/admin/movie', User.signinRequired, User.adminRequired, Movie.new);  // 后台录入页面
    app.get('/admin/update/:id', User.signinRequired, User.adminRequired, Movie.update);  // 更新页
    app.post('/admin/movie/new', User.signinRequired, User.adminRequired, Movie.save);  // 后台录入的接口
    app.get('/admin/list', User.signinRequired, User.adminRequired, Movie.list);  // 电影列表页
    app.delete('/admin/list', User.signinRequired, User.adminRequired, Movie.del);  // 删除接口

    // Comment
    app.post('/user/comment', User.signinRequired, Comment.save);
};
