const gulp = require("gulp");
const babel = require("gulp-babel");
const plumber = require("gulp-plumber");
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
gulp.task('js', function() {
  gulp.src('js/**/*.js')
    .pipe(plumber())
    .pipe(babel({
      "presets": ["es2015"],
      sourceMaps: true
    }))
    .pipe(gulp.dest('public/js'))
});

gulp.task('sass',function () {
  gulp.src('stylesheets/**/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(gulp.dest('public/css'))
});

gulp.task('sass:w', function() {
  gulp.watch('stylesheets/**/*.scss', ['sass']);
});

gulp.task('js:w', function() {
  gulp.watch('js/**/*.js', ['js']);
})

gulp.task('default', ['sass','js','js:w','sass:w'], function() {
  console.log('compile');
});
