var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    less = require('gulp-less'),
    lessImport = require('gulp-less-import'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');

var path = {
    src: {
        pages: 'dist/pug/*.pug',
        styles: [
            'dist/less/helpers/*.less',
            'dist/less/blocks/**/*.less'
        ],
        scripts: 'dist/js/**/**/*.js'
    },
    dist: {
        pages: 'src',
        styles: 'src/css',
        scripts: 'src/js'
    },
    watch: {
        pages: 'dist/pug/**/**/*.pug',
        styles: 'dist/less/**/**/*.less',
        scripts: 'dist/js/**/**/*.js'
    }
};

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
});

gulp.task('pages:build', function () {
    gulp.src(path.src.pages)
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(path.dist.pages))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles:build', function () {
    gulp.src(path.src.styles)
        .pipe(lessImport('dist/less/style.less'))
        .pipe(less())
        .pipe(concat('style.css'))
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 3 version', 'ie 8', 'ie 9'],
            cascade: false
        }))
        .pipe(gulp.dest(path.dist.styles))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts:build', function () {
    gulp.src(path.src.scripts)
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.dist.scripts))
        .pipe(browserSync.reload({stream: true}));;
});

gulp.task('build', function () {
    gulp.start('pages:build');
    gulp.start('styles:build');
    gulp.start('scripts:build');
});

gulp.task('watch', function () {
    watch([path.watch.pages], function() {
        gulp.start('pages:build');
    });
    watch([path.watch.styles], function() {
        gulp.start('styles:build');
    });
    watch([path.watch.scripts], function() {
        gulp.start('scripts:build');
    });
});

gulp.task('default', ['build', 'browser-sync', 'watch']);
