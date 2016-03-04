var gulp = require('gulp');
var babelify = require('babelify');
var del = require('del');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var mocha = require('gulp-mocha');
var espowerBabel = require('espower-babel/guess');
var fs = require('fs');
var eslint = require('gulp-eslint');

var DIST_DIRECTORY = './dist';

gulp.task('clean', function (cb) {
    del([DIST_DIRECTORY]);
    cb();
});

gulp.task('build', ['clean'], function () {
    browserify(['./index.js'], {debug: true})
        .transform(babelify)
        .bundle()
        .on('error', function (err) {
            console.log(err.message);
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest(DIST_DIRECTORY));
});

gulp.task('watch', function () {
    gulp.watch('./index.html', ['build']);
    gulp.watch('./index.js', ['build']);
    gulp.watch('./components/**/*.js', ['build']);
});

gulp.task('lint', function () {
    return gulp.src(['**/*.js', '!gulpfile.js', '!dist/**', '!test/**', '!node_modules/**'])
        .pipe(eslint('.eslintrc'))
        .pipe(eslint.format())
        .pipe(eslint.format('checkstyle', fs.createWriteStream('checkstyle-result.xml')));
});

gulp.task('test', function () {
    return gulp.src(['./test/*.js'])
        .pipe(mocha({reporter: 'mocha-junit-reporter', compilers: {js: espowerBabel}}));
});
