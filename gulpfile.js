var gulp = require('gulp')
var sass = require('gulp-sass')
var imagemin = require('gulp-imagemin')
var connect = require('gulp-connect')
var pug = require('gulp-pug')
var concat = require('gulp-concat')

gulp.task('connect', function(){
    connect.server({
        root: __dirname + '/assets',
        port: 5000,
        livereload: true
    })
})

gulp.task('dev.sass', function() {

    return gulp.src('./_sass/main.scss')
    .pipe(sass({
        includePaths: [
            './node_modules/bootstrap-sass/assets/stylesheets/',
            './node_modules/bourbon/app/assets/stylesheets/'
        ]
    }).on('error', sass.logError))
    .pipe(gulp.dest('./assets/css'))
    .pipe(connect.reload())

})

gulp.task('dev.images', function() {
    return gulp.src('./_images/**')
    // .pipe(imagemin())
    .pipe(gulp.dest('./assets/images'))
    .pipe(connect.reload())
})

gulp.task('dev.js', function() {
    return gulp.src([
        './_js/jquery.js',
        './_js/bxslider.js',
        './_js/main.js'
    ])
    .pipe(concat('main.js',{newLine: ';'}))
    .pipe(gulp.dest('./assets/js'))
    .pipe(connect.reload())
})

gulp.task('dev.pug', function() {

    return gulp.src(['./_pug/*.pug','!./_pug/_*.pug'])
    .pipe(pug({
        pretty: true
    }).on('error', function(err){
      console.error(err);
    }))
    .pipe(gulp.dest('./assets/'))
    .pipe(connect.reload())

})

gulp.task('default', ['dev.pug', 'dev.sass', 'dev.js', 'dev.images'])

gulp.task('watch', ['default', 'connect'], function() {
    gulp.watch('./_sass/**/*.scss', ['dev.sass'])
    gulp.watch('./_images/**', ['dev.images'])
    gulp.watch('./_pug/*.pug', ['dev.pug'])
    gulp.watch('./_js/**/*.js', ['dev.js'])
})
