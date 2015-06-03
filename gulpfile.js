var gulp = require('gulp'); 

var sass = require('gulp-sass');

gulp.task('default', function() {
    return gulp.src('client/assets/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('client/assets/css'));
});