var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');

// Static Server + watching scss/html files
gulp.task('serve', ['sass', 'scripts'], function() {

  browserSync.init({
    server: './'
  });

  gulp.watch('./sass/*.scss', ['sass']);
  gulp.watch('scripts/**/*.js', ['scripts']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('./sass/style.scss')
	  .pipe(sass().on('error', sass.logError))
	  .pipe(gulp.dest('./css'))
	  .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('scripts/**/*.js')
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);