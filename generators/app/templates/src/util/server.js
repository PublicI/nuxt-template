var browserify = require('browserify-middleware'),
    express = require('express'),
    fs = require('fs'),
    less = require('less-middleware'),
    path = require('path'),
    ractive = require('ractive-render'),
    script = require('../script/script');

var app = express();

ractive.config({
    stripComments: false
});

app.engine('html', ractive.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/../');

app.get('/embed.html', function(req, res) {
    script.render(function (content) {
        res.render('embed', {
            imgPath: 'img/',
            scriptPath: 'script/',
            stylePath: 'style/',
            commonPath: 'script/lib/dev/',
            content: content,
            stripComments: false,
            preserveWhitespace: true
        });
    });
});
/*
express.static.mime.define({
    'application/json': ['topojson']
});*/

app.use('/script/embed.js', browserify(__dirname + '/../script/embed.js'));
app.use('/script/script.js', browserify(__dirname + '/../script/script.js'));
app.use(less(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../')));

if (require.main === module) {
    app.listen(process.env.PORT || 5000);
}

module.exports = app;
