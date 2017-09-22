(function( $ ) {
	// Handlebars helpers
	Handlebars.registerHelper( 'cutString', function( text, length, options ) {
		var separator = ' ';

		if ( text.length <= length ) return text;
		return text.substr( 0, text.lastIndexOf( separator, length ) ) + '...';

	} );

	var $componentSelector = $( '#js-content-signals' );
	var components = window.components || {};

	components.signalsComponent = {};

	var signalsComponent = (function() {
		var serviceURL = 'http://projects-api.webtraining.zone:4000/traffic-signals/v1/signals';
		var templateURL = '/dist/templates/signals.hbs';
		var compiledTemplate = null;

		function init() {

			$.when.apply( this, [ getAJAXDataByURL( templateURL ), getAJAXDataByURL( serviceURL ) ] )
				.then( function( responseSourceTemplate, responseData ) {
					// Render the signals
					var source = responseSourceTemplate[ 0 ];

					compiledTemplate = Handlebars.compile( source );
					components.signalsComponent.originalSignals = responseData[ 0 ].signals;

					// Render the template
					renderSignals( components.signalsComponent.originalSignals );

					// Create filter
					createFilter();
				} );
		}

		function renderSignals( signals ) {
			var html = compiledTemplate( { signals: signals } );
			$componentSelector.html( html );
		}

		function getAJAXDataByURL( url ) {
			return $.ajax( url );
		}

		function filterSignals( searchTerm ) {
			if ( searchTerm === '' ) return components.signalsComponent.originalSignals;

			return components.signalsComponent.originalSignals.filter( function( signal ) {
				return signal.name.toLocaleLowerCase().indexOf( searchTerm ) >= 0;
			} );
		}

		function createFilter() {
			function hideNonMatchingItems( $items, filterTerm ) {
				$items.each( function( i ) {
					var $this = $( this );
					var wasTextFound = $this.text().toLowerCase().indexOf( filterTerm ) < 0;
					$this.toggleClass( 'hidden', wasTextFound );
				} );
			}

			var $items = $componentSelector.find( 'div.b-signal' );

			$( '#js-filter' ).keyup( function( e ) {
				var $this = $( this );
				//if ( $this.val().trim() !== '' ) {
				var searchTerm = $this.val().toLowerCase();

				console.log( searchTerm );
				// hideNonMatchingItems( $items, searchTerm );
				var filteredSignals = filterSignals( searchTerm );
				renderSignals( filteredSignals );
				//}

			} );
		}

		return {
			init: init
		}
	})();

	if ( $componentSelector.length > 0 ) {
		signalsComponent.init();
	}

	if ( typeof window.components === 'undefined' ) {
		window.components = components;
	}

})( window.jQuery );