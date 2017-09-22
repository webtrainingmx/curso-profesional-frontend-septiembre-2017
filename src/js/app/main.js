(function( $ ) {
	var app = (function() {
		function init() {
			enableNavigation();
		}

		function enableNavigation() {
			var currentSlug = $( '#js-content' ).data( 'slug' );

			$( '#js-main-navigation' ).find( 'a' ).filter( function( index, navigationLink ) {
				return $( navigationLink ).attr( 'href' ).indexOf( currentSlug ) > 0;
			} ).addClass( 'is-active' );
		}

		return {
			init: init
		};

	})();

	app.init();

})( window.jQuery );