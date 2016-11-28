/**
 * Created by Alvin on 2016/11/27.
 */

var Movie = require('../models/movie');

exports.index =  function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }

        res.render('index', {
            title: 'movie首页',
            movies: movies
        });
    });
};
