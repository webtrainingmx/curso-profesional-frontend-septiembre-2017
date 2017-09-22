const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const util = require( 'util' );
const rename = require( 'gulp-rename' );
const concat = require( 'gulp-concat' );
const cleanCSS = require( 'gulp-clean-css' );
const sourcemaps = require( 'gulp-sourcemaps' );
const uglify = require( 'gulp-uglify' );
const watch = require( 'gulp-watch' );
const fileinclude = require( 'gulp-file-include' );
const browserSync = require( 'browser-sync' ).create();

// SASS Compilation Tasks
gulp.task( 'sass', () => {
	return gulp.src( './src/scss/main.scss' )
		.pipe( sourcemaps.init() )
		.pipe( sass().on( 'error', sass.logError ) )
		.pipe( rename( 'all-styles.css' ) )
		.pipe( cleanCSS( { compatibility: 'ie8' } ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( './dist/css' ) );
} );

gulp.task( 'copy-assets', () => {
	return gulp.src( './src/img/*.png' )
		.pipe( gulp.dest( './dist/img' ) )
} );

gulp.task( 'watch', () => {
	// Watch for changes on SASS files
	watch( './src/scss/**/*.scss', ( file ) => {
		util.log( 'SCSS file changed: ', file.path );
		gulp.start( 'sass', browserSync.reload );

	} ).on( 'error', function( error ) {
		util.log( util.colors.red( 'Error' ), error.message );
	} );

	// Watch for changes on JavaScript files
	watch( './src/js/**/*.js', ( file ) => {
		util.log( 'JavaScript file changed: ', file.path );
		gulp.start( 'minify-js', browserSync.reload );

	} ).on( 'error', function( error ) {
		util.log( util.colors.red( 'Error' ), error.message );
	} );

	// Watch for changes on pages
	watch( './src/pages/**/*.html', ( file ) => {
		util.log( "Include HTML file changed: ", file.path );
		gulp.start( "file-include", browserSync.reload );

	} ).on( "error", function( error ) {
		util.log( util.colors.red( "Error" ), error.message );
	} );
} );

gulp.task( 'file-include', () => {
	gulp.src( [ './src/pages/wrappers/*.include.html' ] )
		.pipe( fileinclude( {
			prefix: '@@',
			basepath: '@file'
		} ) )
		.pipe( rename( ( path ) => {
			path.dirname += "/";
			path.basename = path.basename.replace( ".include", "" );
			path.extname = ".html"
		} ) )
		.pipe( gulp.dest( './dist/pages' ) );
} );

gulp.task( 'browserSync', () => {
	browserSync.init( {
		server: {
			baseDir: './'
		}
	} )
} );

const jsDir = './src/js/app/';

gulp.task( 'minify-js', () => {
	return gulp.src( [
		jsDir + 'utils.js',
		jsDir + 'navigation.js',
		jsDir + 'senales.js'
	] )
		.pipe( concat( 'all-scripts.js' ) )
		.pipe( gulp.dest( './dist/js' ) )
		.pipe( rename( 'all-scripts.min.js' ) )
		.pipe( uglify() )
		.pipe( gulp.dest( './dist/js' ) );
} );

gulp.task( 'minify-js-vendor', () => {
	return gulp.src( './src/js/vendor/*.js' )
		.pipe( concat( 'all-scripts-vendor.js' ) )
		.pipe( gulp.dest( './dist/js' ) )
		.pipe( uglify() )
		.pipe( rename( 'all-scripts-vendor.min.js' ) )
		.pipe( gulp.dest( './dist/js' ) );
} );

gulp.task( 'build', [ 'file-include', 'copy-assets', 'sass', 'minify-js', 'minify-js-vendor' ] );

gulp.task( 'serve', [ 'file-include', 'copy-assets', 'sass', 'minify-js', 'minify-js-vendor', 'watch', 'browserSync' ] );
