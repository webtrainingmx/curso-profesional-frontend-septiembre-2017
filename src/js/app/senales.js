(function( $ ) {
	// Handlebars helpers
	Handlebars.registerHelper( 'cutString', function( text, length, options ) {
		var separator = ' ';

		if ( text.length <= length ) return text;
		return text.substr( 0, text.lastIndexOf( separator, length ) ) + '...';

	} );

	var senalesComponent = (function() {
		var serviceURL = 'http://projects-api.webtraining.zone:4000/traffic-signals/v1/signals';
		var templateURL = '/dist/templates/signals.hbs';
		var componentSelector = '#js-content';

		function init() {

			$.when.apply( this, [ getAJAXDataByURL( templateURL ), getAJAXDataByURL( serviceURL ) ] )
				.then( function( responseSourceTemplate, responseData ) {
					var source = responseSourceTemplate[ 0 ];
					var data = responseData[ 0 ];
					var compiledTemplate = Handlebars.compile( source );

					var html = compiledTemplate( { title: 'Señales de tránsito', signals: data.signals } );
					$( componentSelector ).html( html );

				} );
		}

		function getAJAXDataByURL( url ) {
			return $.ajax( url );
		}

		return {
			init: init
		}
	})();

	senalesComponent.init();

})( window.jQuery );