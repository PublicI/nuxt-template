const awspublish = require('gulp-awspublish'),
      fs = require('fs'),
      pkg = require('./package.json'),
      rename = require('gulp-rename'),
      yaml = require('js-yaml'),
      gulp = require('gulp');

gulp.task('push', cb => {
    const config = yaml.safeLoad(fs.readFileSync(`${__dirname}/config.yml`, 'utf8'));

    const publisher = awspublish.create({
        accessKeyId: config.aws.key,
        secretAccessKey: config.aws.secret,
        params: {
            Bucket: config.aws.bucket
        }
    });

    return gulp.src(['dist/**'])
        .pipe(rename(path => {
            path.dirname = `${pkg.name}/${path.dirname}`;
        }))
        .pipe(awspublish.gzip())
        .pipe(publisher.publish({
            'Cache-Control': `s-maxage=${60 * 2},max-age=0`
        }))
        .pipe(publisher.cache())
        .pipe(awspublish.reporter());
});
