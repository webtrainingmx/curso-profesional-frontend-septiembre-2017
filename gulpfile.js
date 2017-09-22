const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const util = require( 'util' );
const rename = require( 'gulp-rename' );
const cleanCSS = require( 'gulp-clean-css' );
const sourcemaps = require( 'gulp-sourcemaps' );

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
	watch( 'src/scss/**/*.scss', ( file ) => {
		util.log( 'SCSS file changed: ', file.path );
		gulp.start( 'sass', browserSync.reload );

	} ).on( 'error', function( error ) {
		util.log( util.colors.red( 'Error' ), error.message );
	} );
} );

gulp.task( 'browserSync', () => {
	browserSync.init( {
		server: {
			baseDir: './'
		}
	} )
} );

gulp.task( 'build', [ 'sass' ] );

gulp.task( 'serve', [ 'copy-assets', 'sass', 'watch', 'browserSync' ] );
