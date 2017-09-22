(function( $ ) {
	var navigationComponent = (function() {
		function init() {
			setActiveLinkInNavigation();
		}

		function setActiveLinkInNavigation() {
			var currentSlug = $( '#js-content' ).data( 'slug' );

			$( '#js-main-navigation' ).find( 'a' ).filter( function( index, navigationLink ) {
				return $( navigationLink ).attr( 'href' ).indexOf( currentSlug ) > 0;
			} ).addClass( 'is-active' );
		}

		return {
			init: init
		};

	})();

	navigationComponent.init();

})( window.jQuery );