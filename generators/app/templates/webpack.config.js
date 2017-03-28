const pkg = require('./package.json'),
      webpack = require('webpack'),
      merge = require('webpack-merge'),
      nodeExternals = require('webpack-node-externals');

const env = process.env.NODE_ENV;

let common = {
    output: {
        filename: '[name].js',
        publicPath: '/',
        path: (env !== 'development' ? `${__dirname}/dist/` : `${__dirname}/src/`)
    },
    node: {
        __dirname: false
    },
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

let webEntry = {
    embed: './src/script/embed.js'
};

webEntry[`${pkg.version}/script`] = ['es6-promise/auto', `./src/script/script.js`];

let definePlugin = new webpack.DefinePlugin({
    'PKG_VERSION': `'${pkg.version}'`,
    'PKG_NAME': `'${pkg.name}'`,
    'process.env.NODE_ENV': "'" + (env !== 'development' ? 'production' : env) + "'"
    // 'require.main': 'module'
});

let uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    },
    sourceMap: true
});

let bannerPlugin = new webpack.BannerPlugin({
    banner: 'require("source-map-support").install();',
    raw: true,
    entryOnly: false
});

module.exports = (env !== 'development' ? ['node','web'] : ['web']).map((target) => {
    if (target == 'node') {
        return merge(common,{
            target: target,
            entry: {
                app: './src/app.js'
            },
            externals: [nodeExternals()],
            plugins: [bannerPlugin,definePlugin]
        });
    }

    return merge(common,{
        target: target,
        entry: webEntry,
        plugins: [definePlugin,uglifyPlugin]
    });
});
