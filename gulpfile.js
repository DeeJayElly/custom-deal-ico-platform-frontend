const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const scripts = require('./scripts');
const styles = require('./styles');

// Some pointless comments for our project.

var devMode = false;

gulp.task('css', function () {
    gulp.src(styles)
        .pipe(concat('main.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function () {
    gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function () {
    return gulp.src(['./src/components/**/*.html', './src/*.html'])
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// gulp.task('copy', function () {
//     return gulp.src(['./src/assets/img/*.{png,jpg,jpeg}','./src/assets/img/**/*.{png,jpg,jpeg}', './src/assets/img/**/**/*.{png,jpg,jpeg}'])
//     .pipe(gulp.dest('./dist/assets/img'));
// });

gulp.task('copy', function () {
    return gulp.src([
        './src/assets/*',
        './src/assets/**/*',
        './src/assets/**/**/*',
        './src/assets/**/**/**/*'
    ]).pipe(gulp.dest('dist/assets'))
});

gulp.task('build', function () {
    gulp.start(['css', 'js', 'html', 'copy'])
});

gulp.task('browser-sync', function () {
    browserSync.init(null, {
        open: false,
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('start', function () {
    devMode = true;
    gulp.start(['build', 'browser-sync']);
    gulp.watch(['./src/css/**/*.css'], ['css']);
    gulp.watch(['./src/jquery-1.7.min.js', './src/*.js', './src/components/**/*.js', './src/services/*.js'], ['js']);
    gulp.watch(['./src/components/**/*.html', './src/*.html'], ['html']);
});
