/**
 * navigation.js
 *
 * Handles toggling the navigation menu for small screens and enables tab
 * support for dropdown menus.
 */
( function( $ ) {


	console.log(screenReaderText);
	var container, button, menu, links, subMenus;

	//Container = nav element.
	container = document.getElementById( 'site-navigation' );
	if ( ! container ) {
		return;
	}

	//Button element (Hamburger)
	button = document.getElementById( 'nav-toggle' );
	if ( 'undefined' === typeof button ) {
		return;
	}

	//Ul element
	menu = container.getElementsByTagName( 'ul' )[0];

	$( document ).ready(function() {
	  	if( $('#wpadminbar').length ) {
			$('#nav-toggle').css( "top", "59px" );
			$('.main-navigation.toggled div').css( "margin-top", "97px !important" );
		}

	});


	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	//Set aria expanded + ???
	menu.setAttribute( 'aria-expanded', 'false' );
	if ( -1 === menu.className.indexOf( 'nav-menu' ) ) {
		menu.className += ' nav-menu';
	}


	button.onclick = function() {
		if ( -1 !== container.className.indexOf( 'toggled' ) ) {
			container.className = container.className.replace( ' toggled', '' );
			button.setAttribute( 'aria-expanded', 'false' );
			menu.setAttribute( 'aria-expanded', 'false' );
		} else {
			container.className += ' toggled';
			button.setAttribute( 'aria-expanded', 'true' );
			menu.setAttribute( 'aria-expanded', 'true' );
		}
	};

	//Hamburger icon animation toggle
	document.querySelector( "#nav-toggle" )
	  .addEventListener( "click", function() {
	    this.classList.toggle( "active" );
	});

	// Get all the link elements within the menu.
	links    = menu.getElementsByTagName( 'a' );
	subMenus = menu.getElementsByTagName( 'ul' );

	// Set menu items with submenus to aria-haspopup="true".
	for ( var i = 0, len = subMenus.length; i < len; i++ ) {
		subMenus[i].parentNode.setAttribute( 'aria-haspopup', 'true' );
	}

	// Each time a menu link is focused or blurred, toggle focus.
	for ( i = 0, len = links.length; i < len; i++ ) {
		links[i].addEventListener( 'focus', toggleFocus, true );
		links[i].addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

			// On li elements toggle the class .focus.
			if ( 'li' === self.tagName.toLowerCase() ) {
				if ( -1 !== self.className.indexOf( 'focus' ) ) {
					self.className = self.className.replace( ' focus', '' );
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	function initMainNavigation( container ) {
		// Add dropdown toggle that display child menu items.
		container.find( '.menu-item-has-children > a, .page_item_has_children > a' ).after( '<button class="dropdown-toggle" aria-expanded="false">' + screenReaderText.expand + '</button>' );

		// // Toggle buttons and submenu items with active children menu items.
		// container.find( '.current-menu-ancestor > button' ).addClass( 'toggle-on' );
		// container.find( '.current-menu-ancestor > .sub-menu' ).addClass( 'toggled-on' );
	
	if (window.matchMedia('(min-width: 45em)').matches) {

		$('ul.nav-menu > li.menu-item-has-children').hover(
		  function() {
		  	var _this = $( this ).children( '.dropdown-toggle' );
		  	_this.toggleClass('hovering');
			_this.toggleClass( 'toggle-on' );
			_this.next( '.sub-menu' ).toggleClass( 'toggled-on' );
			_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
			_this.html( _this.html() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand );

		  }, function() {
		   	var _this = $( this ).children( '.dropdown-toggle' );
		   	_this.toggleClass('hovering');
			_this.toggleClass( 'toggle-on' );
			_this.next( '.sub-menu' ).toggleClass( 'toggled-on' );
			_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
			_this.html( _this.html() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand );
		  }
		);
	}


	container.find( '.dropdown-toggle' ).click( function( e ) {
		var _this = $( this );
		
		if ( !$( this ).hasClass( 'hovering' ) ) {
			e.preventDefault();
			_this.toggleClass( 'toggle-on' );
			_this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );
			_this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
			_this.html( _this.html() === screenReaderText.expand ? screenReaderText.collapse : screenReaderText.expand );
		}
	} );

	$( window ).resize( function() {
		$( '.main-navigation' ).removeClass( 'toggled' );
		$( '#nav-toggle' ).removeClass( 'active' );
		$( '#nav-toggle' ).attr( 'aria-expanded', 'false' );
	});

		
	} 
	initMainNavigation( $( '.main-navigation' ) );

	// Re-initialize the main navigation when it is updated, persisting any existing submenu expanded states.
	$( document ).on( 'customize-preview-menu-refreshed', function( e, params ) {
		if ( 'primary' === params.wpNavMenuArgs.theme_location ) {
			initMainNavigation( params.newContainer );

			// Re-sync expanded states from oldContainer.
			params.oldContainer.find( '.dropdown-toggle.toggle-on' ).each(function() {
				var containerId = $( this ).parent().prop( 'id' );
				$( params.newContainer ).find( '#' + containerId + ' > .dropdown-toggle' ).triggerHandler( 'click' );
			});
		}
	});
} )( jQuery );
