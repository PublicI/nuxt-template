import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import favicon from 'serve-favicon';
import fs from 'fs';
import hogan from 'hogan-express';
import less from 'less-middleware';
import logger from 'morgan';
import path from 'path';
import pkg from '../package.json';
import webpack from 'webpack';
import {dev as webpackConfig} from '../webpack.config';
import webpackMiddleware from 'webpack-dev-middleware';

const app = express();

// view engine setup
app.engine('html', hogan);
// app.enable('view cache');
app.set('view engine', 'html');
app.set('views', `${__dirname}/view`);

// misc. express middlware
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// style.less middleware
app.use(`/${pkg.version}`, less(path.join(__dirname, 'style')));
app.use(`/${pkg.version}`, express.static(path.join(__dirname, 'style')));

// app.use('/' + pkg.version + '/fonts', express.static(path.join(__dirname, '..', 'node_modules', 'font-awesome', 'fonts')));

// serves up common scripts
app.use('/apps/common/', express.static(path.join(__dirname, 'script', 'lib', 'common')));

app.get('/', (req, res) => {
    res.render('index', {
        pkg
    });
});

app.get('/embed.html', (req, res) => {
  //  script.render(function (content) {
        res.render('embed', {
            pkg
   //         content: content
        });
 //   });
});

// embed.js webpack middleware

const embedCompiler = webpack(webpackConfig.embed);

import docs from './routes/docs';

app.use(docs);
app.use(`/${pkg.version}`,docs);

app.use('/',webpackMiddleware(embedCompiler, {
    noInfo: true
}));

// script.js webpack middlware
const compiler = webpack(webpackConfig.app);

app.use(`/${pkg.version}`,webpackMiddleware(compiler, {
    noInfo: true
}));

app.use(`/${pkg.version}`, express.static(path.join(__dirname)));
app.use('/', express.static(path.join(__dirname)));

if (require.main === module) {
    app.listen(process.env.PORT || 5000);
}

export default app;