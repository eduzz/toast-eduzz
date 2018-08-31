var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    rename          = require('gulp-rename'),
    uglify          = require('gulp-uglify'),
    autoprefixer    = require('gulp-autoprefixer'),
    sass            = require('gulp-sass');


gulp.task('js',function(){
    gulp.src(
        [
            'src/js/*.js'
        ]
    )
    .pipe(concat('toast-eduzz.min.js'))
    .pipe(uglify().on('error', function(e){
        console.log(e);
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function() {
    gulp.src('src/scss/**/*.scss')
          .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
          .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
          }))
          .pipe(rename('toast-eduzz.min.css'))
          .pipe(gulp.dest('./dist/'));
});


gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('build', ['js', 'sass']);
