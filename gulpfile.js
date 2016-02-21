var gulp            = require('gulp');
var rimraf          = require('gulp-rimraf');
var concat          = require('gulp-concat');
var ngHtml          = require('gulp-ng-html2js');
var browserify      = require('browserify');
var gulpSequence    = require('gulp-sequence');
var sass            = require('gulp-sass');
var fs              = require('fs');
var karma           = require('karma');
var browserSync     = require('browser-sync');

// ------------------------------------------------------------------------------
// Configuration
// ------------------------------------------------------------------------------
var config = {
    src: {
        root:      './src',
        index:     './src/index.html',
        indexScript: './src/bootstrap.js',
        templates: './src/scripts/**/*.html',
        styles:    './src/styles/*.sass',
        scripts:   './src/scripts/**/*.js',
        fonts:     './src/assets/fonts/*',
        images:    './src/assets/images/**/*'

    },
    dest: {
        root:      './build',
        styles:    './build/stylesheets',
        scripts:   './build/javascript',
        assets:    './build/assets'
    }
};

// ------------------------------------------------------------------------------
// Development tasks
// ------------------------------------------------------------------------------
gulp.task('clean', function () {
    return gulp.src( config.dest.root, { read: false })
        .pipe( rimraf() );
});

gulp.task('index', function () {
    return gulp.src( config.src.index )
        .pipe( gulp.dest( config.dest.root ) );
});

gulp.task('templates', function () {
    return gulp.src( config.src.templates )
        .pipe( ngHtml({ moduleName: 'templates' }) )
        .pipe( concat('templates.js'))
        .pipe( gulp.dest( config.src.root + '/scripts/templates' ) );
});

gulp.task('fonts', function() {
    return gulp.src( config.src.fonts )
        .pipe( gulp.dest( config.dest.assets + '/fonts') );
});

gulp.task('sass', function () {
    return gulp.src( config.src.styles )
        .pipe( sass().on('error', sass.logError ) )
        .pipe( concat('app.css') )
        .pipe( gulp.dest( config.dest.root ) );
});

gulp.task('scripts', function () {
    return browserify( config.src.indexScript ).bundle()
        .pipe( fs.createWriteStream( config.dest.root + '/app.js') );
});

gulp.task('build', gulpSequence('clean', 'fonts', 'index', 'templates', 'sass', 'scripts'));

gulp.task('unit', function ( done ) {
    new karma.Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('browserSync', function () {
    return browserSync({
        server: config.dest.root,
        files: config.src.root,
        ghostMode: { clicks: false, forms: false, scroll: false },
        open: false
    });
});

gulp.task('watch', function () {
    gulp.watch( config.src.index,     ['index']);
    gulp.watch( config.src.templates, ['templates']);
    gulp.watch( config.src.scripts,   ['scripts']);
    gulp.watch( config.src.styles,    ['sass']);
    gulp.watch( config.src.images,    ['images']);
});

// ------------------------------------------------------------------------------
// Default
// ------------------------------------------------------------------------------
gulp.task('default', gulpSequence('build', 'watch', 'browserSync', 'unit'));