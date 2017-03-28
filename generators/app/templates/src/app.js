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
import webpackConfig from '../webpack.config';
import webpackMiddleware from 'webpack-dev-middleware';

const env = process.env.NODE_ENV;

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

if (env === 'development') {
    // style.less middleware
    app.use(`/${pkg.version}`, less(path.join(__dirname, 'style')));
    app.use(`/${pkg.version}`, express.static(path.join(__dirname, 'style')));

    // app.use('/' + pkg.version + '/fonts', express.static(path.join(__dirname, '..', 'node_modules', 'font-awesome', 'fonts')));

    // serves up common scripts
    app.use('/apps/common/', express.static(path.join(__dirname, 'script', 'lib', 'common')));
}

app.get(['/','/index.html','/embed.html'], (req, res) => {
    res.render('index', {
        pkg
    });
});

app.get(['/preview','/preview.html'], (req, res) => {
    res.render('preview', {
        pkg
    });
});

import example from './routes/example';

app.use(example);
app.use(`/${pkg.version}`,example);

if (env === 'development') {
    // webpack middlware
    const compiler = webpack(webpackConfig);

    app.use(['/',`/${pkg.version}`],webpackMiddleware(compiler, {
        noInfo: true
    }));

    app.use(`/${pkg.version}`, express.static(path.join(__dirname)));
}

// http://stackoverflow.com/a/33633199
app.use('/', (req, res, next) => {
    if (req.url.match(/^\/app/)) {
        return res.status(403).end('403 Forbidden');
    }

    next();
});

app.use('/', express.static(path.join(__dirname)));

if (!module.parent) {
    app.listen(process.env.PORT || 5000);
}

export default app;
