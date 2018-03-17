'use strict';

const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// compile sass
gulp.task('compileSass', () => {
    return gulp.src('src/scss/app.scss')
        .pipe(maps.init())
        .pipe(sass().on('error', sass.logError))
        // name for css file
        .pipe(concat('app.css'))
        .pipe(maps.write('.'))
        // write to this directory
        .pipe(gulp.dest('dist/css'));
});

// reload
gulp.task('reload', () => {
    browserSync.reload();
    done();
})

// compile sass and reload
gulp.task('sassReload', ['compileSass'], (done) => {
    browserSync.reload();
    done();
})

// watch task
gulp.task('watchFiles', ['compileSass'], (done) => {
    // compile and reload when scss file changes
    gulp.watch(['src/scss/**/*.scss'], ['sassReload']);
    // reload when html file changes
    gulp.watch(['dist/*.html'], ['reload']);
})

// start browser-sync server
gulp.task('browserSync', () => {
    browserSync.init({
        server: "./dist",
        notify: false
    });
})

// default task
gulp.task('default', () => {
    gulp.start('watchFiles');
    gulp.start('browserSync');
});
