(function( $ ) {
	var senalesComponent = (function() {
		var serviceURL = 'http://projects-api.webtraining.zone:4000/traffic-signals/v1/signals';

		function init() {
			getTrafficSignalsData().then( function( data ) {
				console.log( data );
			} );
		}

		function getTrafficSignalsData() {
			return $.ajax( serviceURL );
		}

		return {
			init: init
		}
	})();

	senalesComponent.init();

})( window.jQuery );