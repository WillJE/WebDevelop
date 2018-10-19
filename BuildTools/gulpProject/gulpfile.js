const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const uglify = require('gulp-uglify')
const sass = require('gulp-sass')
const concat = require('gulp-concat')

/*
	--TOP LEVEL FOUR FUNCTION
	gulp.task - Define tasks
	gulp.src - Point to files to use
	gulp.dest - Point to floder to output
	gulp.watch - Watch files and folders for changes
*/

gulp.task('run', function() {
	return console.log('gulp task run is running....');
});


// COPY ALL HTML FILES
gulp.task('copyHTML', function() {
	gulp.src('src/*.html')
		.pipe(gulp.dest('dist'));
});


// Optimize IMAGE
gulp.task('imagemin', () =>
	gulp.src('src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'))
);

// Minize JS file
gulp.task('minify', () =>
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
);

// Transpiling sass to css
gulp.task('sass', function(){
	gulp.src('src/sass/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dist/css'));
});

// Concat the other js file
gulp.task('concat', function(){
	gulp.src('src/js/*.js')
		.pipe(uglify())
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'))
});

//USE gulp command to start default task
//Each task will run one by one
gulp.task('default',['run','copyHTML', 'concat', 'imagemin', 'sass']);


//This will watch the file change
gulp.task('watch', function(){
	gulp.watch('src/js/*.js', ['concat']);
	gulp.watch('src/sass/*.scss', ['sass']);
	gulp.watch('src/*.html', ['copyHTML']);
	gulp.watch('src/images/*', ['imagemin']);
});