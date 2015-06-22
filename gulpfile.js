var gulp =    require('gulp'); 
var sass =    require('gulp-sass');
var nodemon = require('gulp-nodemon');

gulp.task('css', function() {
    return gulp.src('client/assets/sass/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('client/assets/css'));
});

gulp.task('watch', function() {
    return gulp.watch('client/assets/sass/*.scss', ['css']);
});

gulp.task('launch', function() {
    return nodemon({
        script: 'server.js'
    });
});

gulp.task('default', ['css', 'watch', 'launch']);