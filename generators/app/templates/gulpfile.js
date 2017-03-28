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
      webpackConfig = require('./webpack.config'),
      yaml = require('js-yaml');

gulp.task('style', () => gulp.src('src/style/*.less')
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
    .pipe(gulp.dest(`dist/${pkg.version}`)));

gulp.task('jshint', () => gulp.src(['src/script/**/*.js'], {
        base: 'src/script/'
    })
    .pipe(jshint({
        esnext:true
    }))
    .pipe(jshint.reporter(stylish)));

gulp.task('scripts', cb => webpack(webpackConfig,cb));

gulp.task('bakePreview', cb => {
    hogan(`${__dirname}/src/view/preview.html`, {
        pkg,
        settings: {}
    }, (err, html) => {
        if (err) {
            cb(err);
            return;
        }

        fs.writeFile(`${__dirname}/dist/preview.html`, html, {
            encoding: 'utf8'
        }, err => {
            if (!err) {
                cb(err);
                return;
            }

            cb();
        });
    });
});

gulp.task('bakeIndex', cb => {
    hogan(`${__dirname}/src/view/index.html`, {
        pkg,
        settings: {}
    }, (err, html) => {
        if (err) {
            cb(err);
            return;
        }

        fs.writeFile(`${__dirname}/dist/index.html`, html, {
            encoding: 'utf8'
        }, err => {
            if (!err) {
                cb(err);
                return;
            }

            cb();
        });
    });
});

gulp.task('copy', () => {
    const imgCopy = gulp.src(['src/img/**'], {
                        base: 'src/'
                    })
                    .pipe(gulp.dest(`dist/${pkg.version}`));

    const viewCopy = gulp.src(['src/view/**'], {
                        base: 'src/'
                    })
                    .pipe(gulp.dest('dist'));

    const oembedCopy = gulp.src(['src/data/oembed.json'], {
                        base: 'src/data/'
                    })
                    .pipe(gulp.dest('dist/'));


    return merge(imgCopy,viewCopy,oembedCopy);
});

gulp.task('push', cb => {
    const config = yaml.safeLoad(fs.readFileSync(`${__dirname}/config.yml`, 'utf8'));

    const publisher = awspublish.create({
        accessKeyId: config.aws.key,
        secretAccessKey: config.aws.secret,
        params: {
            Bucket: config.aws.bucket
        }
    });

    const rest = gulp.src([`dist/${pkg.version}/**`])
        .pipe(rename(path => {
            path.dirname = `/apps/2017/03/${pkg.name}/${pkg.version}/${path.dirname}`;
        }))
        .pipe(awspublish.gzip())
        .pipe(publisher.publish())
        .pipe(publisher.cache())
        .pipe(awspublish.reporter())
        .on('end', () => {
            gulp.src(['dist/*','!dist/view/**','!dist/app*'])
                .pipe(rename(path => {
                    path.dirname = `/apps/2017/03/${pkg.name}/${path.dirname}`;
                }))
                .pipe(publisher.publish({
                    'Cache-Control': `s-maxage=${60 * 2},max-age=0`
                }))
                .pipe(publisher.cache())
                .pipe(awspublish.reporter())
                .on('end',cb);
        });
});

gulp.task('build', ['bakePreview',
                    'bakeIndex',
                    'copy',
                    'style',
                    'jshint',
                    'scripts']);
