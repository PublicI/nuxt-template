const awspublish = require('gulp-awspublish'),
      csslint = require('gulp-csslint'),
      fs = require('fs'),
      gulp = require('gulp'),
      hogan = require('hogan-express'),
      jshint = require('gulp-jshint'),
      less = require('gulp-less'),
      merge = require('merge-stream'),
      cleanCSS = require('gulp-clean-css'),
      pkg = require('./package.json'),
      rename = require('gulp-rename'),
      stylish = require('jshint-stylish'),
      uglify = require('gulp-uglify'),
      webpack = require('webpack'),
      webpackConfig = require('./webpack.config').prod,
      yaml = require('js-yaml');

gulp.task('style', function() {
    return gulp.src('src/style/*.less')
        .pipe(less({
            paths: ['.', 'lib']
        }))
        /*
        .pipe(csslint({
            'box-model': false,
            'adjoining-classes': false,
            'import': false,
            'known-properties': false
        }))
        .pipe(csslint.formatter())*/
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/' + pkg.version));
});

gulp.task('jshint', function() {
    return gulp.src(['src/script/**/*.js'], {
            base: 'src/script/'
        })
        .pipe(jshint({
            esnext:true
        }))
        .pipe(jshint.reporter(stylish));
});

gulp.task('embedScripts', function(cb) {
    webpack(webpackConfig.embed,cb);
});

gulp.task('scripts', function(cb) {
    webpack(webpackConfig.app,cb);
});

gulp.task('bakeEmbed', function(cb) {
    hogan(__dirname + '/src/view/embed.html', {
        pkg: pkg,
        settings: {}
    }, function(err, html) {
        if (err) {
            cb(err);
            return;
        }

        fs.writeFile(__dirname + '/dist/embed.html', html, {
            encoding: 'utf8'
        }, function(err) {
            if (!err) {
                cb(err);
                return;
            }

            cb();
        });
    });
});

gulp.task('bakeIndex', function(cb) {
    hogan(__dirname + '/src/view/index.html', {
        pkg: pkg,
        settings: {}
    }, function(err, html) {
        if (err) {
            cb(err);
            return;
        }

        fs.writeFile(__dirname + '/dist/index.html', html, {
            encoding: 'utf8'
        }, function(err) {
            if (!err) {
                cb(err);
                return;
            }

            cb();
        });
    });
});

gulp.task('copy', function() {
    return gulp.src(['src/images/**'], {
            base: 'src/'
        })
        .pipe(gulp.dest('dist/' + pkg.version));
});


gulp.task('copy-oembed', function() {
    return gulp.src(['src/data/oembed.json'], {
            base: 'src/data/'
        })
        .pipe(gulp.dest('dist/'));
});

gulp.task('push', function(cb) {
    var config = yaml.safeLoad(fs.readFileSync(__dirname + '/config.yml', 'utf8'));

    var publisher = awspublish.create({
        accessKeyId: config.aws.key,
        secretAccessKey: config.aws.secret,
        params: {
            Bucket: config.aws.bucket
        }
    });

    var rest = gulp.src(['dist/' + pkg.version + '/**'])
        .pipe(rename(function(path) {
            path.dirname = '/apps/<%= props.year %>/<%= props.month %>/' + pkg.name + '/' + pkg.version + '/' + path.dirname;
        }))
        .pipe(awspublish.gzip())
        .pipe(publisher.publish())
        .pipe(publisher.cache())
        .pipe(awspublish.reporter())
        .on('end', function() {
            gulp.src(['dist/*'])
                .pipe(rename(function(path) {
                    path.dirname = '/apps/<%= props.year %>/<%= props.month %>/' + pkg.name + '/' + path.dirname;
                }))
                .pipe(publisher.publish({
                    'Cache-Control': 's-maxage=' + (60 * 2) + ',max-age=0'
                }))
                .pipe(publisher.cache())
                .pipe(awspublish.reporter())
                .on('end',cb);
        });
});

gulp.task('build', ['bakeEmbed',
                    'bakeIndex',
                    'copy',
                    'copy-oembed',
                    'style',
                    'jshint',
                    'scripts',
                    'embedScripts']);
