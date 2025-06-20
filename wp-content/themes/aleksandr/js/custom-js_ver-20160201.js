// A $( document ).ready() block.
jQuery( document ).ready(function($) {

    $('.sidebar-none .widget-area').masonry({
	  // options
		  itemSelector: '.widget',
		  columnWidth: '.widget'
	});

});
