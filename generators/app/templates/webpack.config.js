const _ = require('lodash'),
      pkg = require('./package.json'),
      webpack = require('webpack');

// can we simplify this somehow?

// shell for our four configs
let configs = {
    dev: {
        app: null,
        embed: null
    },
    prod: {
        app: null,
        embed: null
    }
};

// initialize uglify plugin (added for prod, not dev)
// does this still make sense even with source maps?
let uglify = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});

// what we pass to the DefinePlugin (broken out because it changes based on prod vs. dev)
let definitions = {
    'PKG_VERSION': `'${pkg.version}'`,
    'PKG_NAME': '\'' + pkg.name + '\''
};

// base loader for app in the develepment environment
configs.dev.app = {
    entry: ['es6-promise/auto', `${__dirname}/src/script/script.js`], // 'whatwg-fetch',
    output: {
        path: `${__dirname}/src/script`,
        filename: 'script.js',
        publicPath: `/${pkg.version}/`
    },
    plugins: [new webpack.DefinePlugin(definitions)],
    devtool: 'source-map',
    resolveLoader: {
        moduleExtensions: ['-loader']
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'vue-template-compiler'
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                //presets: ['es2015'],

                // All of the plugins of babel-preset-es2015,
                // minus babel-plugin-transform-es2015-modules-commonjs
                plugins: [
                    'transform-es2015-template-literals',
                    'transform-es2015-literals',
                    'transform-es2015-function-name',
                    'transform-es2015-arrow-functions',
                    'transform-es2015-block-scoped-functions',
                    'transform-es2015-classes',
                    'transform-es2015-object-super',
                    'transform-es2015-shorthand-properties',
                    'transform-es2015-computed-properties',
                    'transform-es2015-for-of',
                    'transform-es2015-sticky-regex',
                    'transform-es2015-unicode-regex',
                    'check-es2015-constants',
                    'transform-es2015-spread',
                    'transform-es2015-parameters',
                    'transform-es2015-destructuring',
                    'transform-es2015-block-scoping',
                    'transform-es2015-typeof-symbol',
                    ['transform-regenerator', { async: false, asyncGenerators: false }],
                ],
            }
        }]
    }
};

// modify base config for embed script in dev
configs.dev.embed = _.cloneDeep(configs.dev.app);

configs.dev.embed.entry = `${__dirname}/src/script/embed.js`;
configs.dev.embed.output.filename = 'embed.js';
configs.dev.embed.output.publicPath = '/';

// modify app script config for built production version
configs.prod.app = _.cloneDeep(configs.dev.app);

configs.prod.app.output.path = __dirname + '/dist/' + pkg.version + '/';
let prodDefinitions = _.cloneDeep(definitions);
prodDefinitions['process.env.NODE_ENV'] = "'production'";
configs.prod.app.plugins = [new webpack.DefinePlugin(prodDefinitions),uglify];

// modify embed dev config for built production version
configs.prod.embed = _.cloneDeep(configs.dev.embed);

configs.prod.embed.output.path = __dirname + '/dist/';
configs.prod.embed.plugins.push(uglify);

module.exports = configs;
