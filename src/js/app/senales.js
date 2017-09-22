(function( $ ) {
	var senalesComponent = (function() {
		var serviceURL = 'http://projects-api.webtraining.zone:4000/traffic-signals/v1/signals';
		var templateURL = '/dist/templates/signals.hbs';

		function init() {

			$.when.apply( [ getAJAXDataByURL( templateURL ), getAJAXDataByURL( serviceURL ) ] )
				.then( function( data ) {
					console.log( data );

					// var source = $( "#entry-template" ).html();
					// var template = Handlebars.compile( source );

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