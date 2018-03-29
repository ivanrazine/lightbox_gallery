var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('styles', function() {
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('./css/'))
});

gulp.task('scripts', function() {
    gulp.src('src/js/scripts.js')
        .pipe(gulp.dest('./js/'));
});

gulp.task('object', function() {
    gulp.src('src/js/object.js')
        .pipe(gulp.dest('./js/'));
});

gulp.task('default', function () {
    gulp.watch('src/sass/**/*.scss',['styles']);
    gulp.watch('src/js/scripts.js',['scripts']);
    gulp.watch('src/js/object.js',['object']);
});


