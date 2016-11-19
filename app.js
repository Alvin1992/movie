/**
 * Created by Alvin on 2016/11/18.
 */

var express = require('express');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');
// Linux下在控制台使用PORT=4000 node app.js就会使用4000这个端口而不是3000
// Windows下需要先设置端口set Port = 1234，然后node app.js
var port = process.env.PORT || 3000;
var app = express();

app.set('views', './views/pages');
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({extended: false}));
app.use(serveStatic('bower_components'));
app.listen(port);

console.log('movie is running at port ' + port);

// 首页
app.get('/', function (req, res) {
    res.render('index', {
        title: 'movie',
        movies: [
            {
                title: '机械战警',
                _id: 1,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            },
            {
                title: '机械战警',
                _id: 2,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            },
            {
                title: '机械战警',
                _id: 3,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            },
            {
                title: '机械战警',
                _id: 4,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            },
            {
                title: '机械战警',
                _id: 5,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            },
            {
                title: '机械战警',
                _id: 6,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            }
        ]
    });
});

app.get('/index', function (req, res) {
    res.render('index', {
        title: 'movie',
        movies: [
            {
                title: '机械战警',
                _id: 1,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            },
            {
                title: '机械战警',
                _id: 2,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            },
            {
                title: '机械战警',
                _id: 3,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            },
            {
                title: '机械战警',
                _id: 4,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            },
            {
                title: '机械战警',
                _id: 5,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            },
            {
                title: '机械战警',
                _id: 6,
                poster: 'http://d.hiphotos.baidu.com/baike/crop%3D0%2C1%2C550%2C362%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26' +
                '/sign=84b51ba20f0828387c42865485a98530/f603918fa0ec08faf2f7a31a51ee3d6d54fbda9c.jpg'
            }
        ]
    });
});

// 详情页
app.get('/movie/:id', function (req, res) {
    res.render('detail', {
        title: '详情',
        movie: {
            title: '机械战警',
            director: '何塞·帕迪里亚',
            country: '美国',
            year: 2014,
            language: '英语',
            summary: '《新机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，' +
            '改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。' +
            '影片的故事背景与原版基本相同，故事发生在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，' +
            '被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
        }
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

// 列表页
app.get('/admin/list', function (req, res) {
    res.render('list', {
        title: '列表页',
        movies: [
            {
                title: '机械战警',
                _id: 1,
                director: '何塞·帕迪里亚',
                country: '美国',
                year: 2014,
                language: '英语',
                flash: 'http://www.baidu.com',
                summary: '《新机械战警》是由何塞·帕迪里亚执导，乔尔·金纳曼、塞缪尔·杰克逊、加里·奥德曼等主演的一部科幻电影，' +
                '改编自1987年保罗·范霍文执导的同名电影。影片于2014年2月12日在美国上映，2014年2月28日在中国大陆上映。' +
                '影片的故事背景与原版基本相同，故事发生在2028年的底特律，男主角亚历克斯·墨菲是一名正直的警察，' +
                '被坏人安装在车上的炸弹炸成重伤，为了救他，OmniCorp公司将他改造成了生化机器人“机器战警”，代表着美国司法的未来。'
            }
        ]
    });
});
