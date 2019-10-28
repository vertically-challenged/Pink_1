var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

function $(done) {
    gulp.src('./scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true, 
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream()); 
    done(); 
}

function sync(done) {
    browserSync.init({
        server: {
            baseDir: './' 
        },
        port: 3000
    })
    done();
}

function browserReload(done) {
    browserSync.reload();
    done(); 
}

function _() {
    gulp.watch("./scss/**/*", $);
}

function watchFiles() {
    gulp.watch("./scss/**/*", $);
    gulp.watch("./**/*", browserReload);
}

gulp.task(_);

gulp.task('default', gulp.parallel(sync, watchFiles));