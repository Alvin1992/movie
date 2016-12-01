/**
 * Created by Alvin on 2016/11/28.
 */

var mongoose = require('mongoose');
var CategorySchema = require('../schemas/category');
var Category = mongoose.model('Category', CategorySchema);

module.exports = Category;
