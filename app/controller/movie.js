/**
 * Created by Alvin on 2016/11/27.
 */

var Movie = require('../models/movie');
var Comment = require('../models/comment');
var Category = require('../models/category');
var multer = require('../util/multerUtil');
var _ = require('underscore');

// 详情页
exports.detail = function (req, res) {
    var id = req.params.id;
    Movie.update({_id: id}, {$inc: {pv:1}}, function (err) {
        if (err) {
            console.log(err);
        }
    });
    Movie.findById(id, function (err, movie) {
        // 获取对应电影的评论可以用promise重写，也可以在前端再发送一个异步请求获取
        Comment.find({movie: id})
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec(function (err, comments) {
                console.log('comments', comments);
                res.render('detail', {
                    title: movie.title,
                    movie: movie,
                    comments: comments
                });
            });
    });
};

// 后台录入页面
exports.new = function (req, res) {
    Category.find({}, function (err, categories) {
        if (err) {
            console.log(err);
        }

        res.render('admin', {
            title: '后台录入',
            movie: {},
            categories: categories
        });
    });
};

// 更新页
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            Category.find({}, function (err, categories) {
                if (err) {
                    console.log(err);
                }

                res.render('admin', {
                    title: 'movie后台更新页面',
                    movie: movie,
                    categories: categories
                });
            });
        });
    }
};

// 存储海报
exports.savePoster = function (req, res, next) {
    var upload = multer.single('uploadPoster');
    upload(req, res, function (err) {
        if (err) {
            return console.log(err);
        }
        req.poster = req.file.filename;
        next();
    })

};

// 后台录入的接口
exports.save = function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;

    if (req.poster) {
        movieObj.poster = req.poster;
    }

    if (id) {
        // 更新数据
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            if (movie.category !== movieObj.category) {
                Category.findById(movie.category, function (err, category) {
                    var idx = category.movies.indexOf(movie._id);
                    category.movies.splice(idx, 1);
                    category.save(function (err, data) {
                        Category.findById(movieObj.category, function (err, cat) {
                            cat.movies.push(movie._id);
                            cat.save(function (err, data) {
                                _movie = _.extend(movie, movieObj);
                                _movie.save(function (err, newMovie) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    res.redirect('/movie/' + movie.id);
                                });
                            });
                        })
                    });
                });
            } else {
                _movie = _.extend(movie, movieObj);
                _movie.save(function (err, newMovie) {
                    if (err) {
                        console.log(err);
                    }
                    res.redirect('/movie/' + movie.id);
                });
            }
        });
    } else {
        _movie = new Movie(movieObj);
        
        var categoryId = movieObj.category;
        var categoryName = movieObj.categoryName;

        _movie.save(function (err, movie) {
            if (err) {
                console.log(err);
            }

            if (categoryId) {
                Category.findById(categoryId, function (err, category) {
                    category.movies.push(_movie._id);
                    category.save(function (err, data) {
                        if (err) {
                            console.log(err);
                        }

                        res.redirect('/movie/' + movie.id);
                    });
                });
            } else if (categoryName) {
                var category = new Category({
                    name: categoryName,
                    movies: [movie._id]
                });
                category.save(function (err, data) {
                    if (err) {
                        console.log(err);
                    }
                    movie.category = data._id;
                    movie.save(function (err, data) {
                        if (err) {
                            console.log(err);
                        }

                        res.redirect('/movie/' + movie.id);
                    });
                });
            }
        });
    }
};

// 电影列表页
exports.list = function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('list', {
            title: 'movie列表页',
            movies: movies
        });
    });
};

// 删除接口
exports.del = function (req, res) {
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
};

