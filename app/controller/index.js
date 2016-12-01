/**
 * Created by Alvin on 2016/11/27.
 */

var Movie = require('../models/movie');
var Category = require('../models/category');

exports.index =  function (req, res) {
    Category
        .find({})
        .populate({path: 'movies', options: {limit: 5}})
        .exec(function (err, categories) {
            if (err) {
                console.log(err);
            }

            res.render('index', {
                title: 'movie首页',
                categories: categories
            });
        });
};

// 搜索页面
exports.search =  function (req, res) {
    var catId = req.query.cat;
    var q = req.query.q;
    var page = parseInt(req.query.p, 10) || 0;
    var count = 2;
    var index = page * count;  // 搜索起始的位置

    if (catId) {
        Category
            .find({_id: catId})
            .populate({path: 'movies',select: 'title, poster'})
            .exec(function (err, categories) {
                if (err) {
                    console.log(err);
                }

                var category = categories[0] || {};
                var movies = category.movies || [];
                var results = movies.slice(index, index + count);
                res.render('results', {
                    title: '结果列表',
                    keyword: category.name,
                    currentPage: (page + 1),
                    query: 'cat=' + catId,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results
                });
            });
    } else {
        Movie
            .find({title: new RegExp(q+'.*', 'i')})
            .exec(function (err, movies) {
                if (err) {
                    console.log(err);
                }

                var results = movies.slice(index, index + count);
                res.render('results', {
                    title: '结果列表',
                    keyword: q,
                    currentPage: (page + 1),
                    query: 'q=' + q,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results
                });
            });
    }
};
