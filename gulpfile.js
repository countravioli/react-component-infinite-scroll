var gulp = require('gulp');
var changed = require('gulp-changed');
var babel = require('gulp-babel');

gulp.task('build', function (callback) {
    return gulp.src('./infinite.jsx')
        .pipe(changed('build', {extension: '.js'}))
        .pipe(babel()) //this will also handle react transformations
        .pipe(gulp.dest('./'));
});
