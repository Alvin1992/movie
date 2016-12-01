/**
 * Created by Alvin on 2016/11/30.
 */

var Category = require('../models/category');

// 录入分类
exports.new = function (req, res) {
    res.render('categoryAdmin', {
        title: '后台分类录入页',
        category: {}
    });
};

// 保存分类的接口
exports.save = function (req, res) {
    var _category = req.body.category;
    var category = new Category(_category);

    category.save(function (err, data) {
        if (err) {
            console.log(err);
        }

        res.redirect('/admin/category/list');
    });
};

// 分类列表页
exports.list = function (req, res) {
    Category.fetch(function (err, categories) {
        if (err) {
            console.log(err);
        }

        res.render('categorylist', {
            title: '分类列表页',
            categories: categories
        });
    });
};
