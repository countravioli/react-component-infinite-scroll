var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('build', function (callback) {
    return gulp.src('./src/infinite.jsx')
        .pipe(babel()) //this will also handle react transformations
        .pipe(gulp.dest('./'));
});
