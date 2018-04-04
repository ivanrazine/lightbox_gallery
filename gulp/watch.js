/////////////////////////////////////////////////////
////// WATCH
/////////////////////////////////////////////////////

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat-multi'),
    notify = require("gulp-notify"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require('browser-sync').create();

gulp.task('jsDev', function() {
    concat({
        'app.js': ['./src/js/vendor/**/*.js', './src/js/common.js', './src/js/**/*.js']
    })
    .pipe(gulp.dest('./app/js/'));
});

gulp.task('jsBrowserSync', ['jsDev'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('BrowserSync', function (done) {
    browserSync.reload();
    done();
});

gulp.task('cssDev', function() {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded', errLogToConsole: false }))
        .on('error', function(err) {
            notify().write(err);
            this.emit('end');
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/css/'))
        .pipe(browserSync.stream());
        
});

gulp.task('watch', function () {

    browserSync.init({
        notify: false,
        server: "./app"
    });

    gulp.watch('./src/sass/**/*.scss',['cssDev']);
    gulp.watch('./src/js/**/*.js',['jsBrowserSync']);
    gulp.watch('./app/**/*.html',['BrowserSync']);

});

gulp.task('w', ['watch']);
