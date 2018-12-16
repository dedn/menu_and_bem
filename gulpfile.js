let gulp = require('gulp');
let sass = require('gulp-sass');
let livereload = require('gulp-livereload');
let connect = require('gulp-connect');
let autoprefixer = require('gulp-autoprefixer');
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');

/**
 * Server connect
 */
gulp.task('connect', () => {
    connect.server({
        root: './develop',
        port: 8000,
        livereload: true
    });
});

/**
 *  html
 */
gulp.task('html', () => {
    gulp.src('develop/*.html')
        .pipe(connect.reload());
});

/**
 * Css
 */
gulp.task('css', () => {
    gulp.src('develop/blocks/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('develop/css'))
        .pipe(connect.reload());
});

/**
 * JavaScript
 */
gulp.task('js', () => {
    gulp.src('develop/src/*js')
        .pipe(connect.reload());
});

/**
 * Img
 */
gulp.task('img', () => {
    return gulp.src('develop/src/img/**/*')
        .pipe((imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))/**/)
        .pipe(gulp.dest('app/src/img'));
});


/**
 * Watch
 */
gulp.task('watch', () => {
    gulp.watch(['develop/blocks/**/*.scss'], ['css']);
    gulp.watch(['develop/*.html'], ['html']);
    gulp.watch(['develop/src/js/*js'], ['js']);
});

/**
 * Build app
 */
gulp.task('build', () => {
    let buildFonts = gulp.src('develop/src/fonts/**/*')
        .pipe(gulp.dest('app/src/fonts'));

    let buildJs = gulp.src('develop/src/js/**/*')
        .pipe(gulp.dest('app/src/js'));

    let buildHtml = gulp.src('develop/*.html')
        .pipe(gulp.dest('app'));

    let buildCss = gulp.src('develop/css/style.css')
        .pipe(gulp.dest('app/css'))
});

/**
 * Default
 */
gulp.task('default', [
    'connect',
    'html',
    'css',
    'js',
    'watch',
    'img',
]);
