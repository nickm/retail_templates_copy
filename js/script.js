$(document).ready(function(){
	Nav.init();
	LightboxToggle.init();
	Marquee.init();
});


// -------------------------- //
// Navigation
// -------------------------- //

var Nav = (function(){
	
	var _self = {},
		_nav,
		_linkList,
		_links,
		_handle,
		_visible = false,
		_clickable = true;
	
	function init(){
		_nav      = $('#mainnav');
		_linkList = _nav.find('ul');
		_links    = _linkList.children('li');
		_handle   = _nav.find('.handle');
		
		_linkList.hide();

		bindEvents();
	}

	function bindEvents(){
		var _eventType = ( $('html').hasClass('touch') ? 'touchstart' : 'click');
		
		_handle.on(_eventType, function(){
			if( !_clickable ){ return; }
			_clickable = false;
			toggleMenu();
		});

		_nav.on('click','a', function(e){
			$(this).parent().addClass('active');
		});
	}

	function toggleMenu(){
		var _delay = 0,
			_step  = 50;

		if( _visible ){
			_visible = false;

			$(_links.get().reverse()).each(function(){
				var _this = $(this);
				setTimeout(function(){
					_this.removeClass('show');
				},_delay);
				_delay += _step;
			});

			setTimeout(function(){
				_clickable = true;
				_linkList.hide();
			},(_delay));
		}
		else {
			_visible = true;
			_linkList.show();

			_links.each(function(){
				var _this = $(this);
				setTimeout(function(){
					_this.addClass('show');
				},_delay);
				_delay += _step;
			});

			setTimeout(function(){
				_clickable = true;
			},(_delay));
		}

		
	}
	
	_self = {
		init : init
	};
	
	return _self;
	
})();







// -------------------------- //
// LIGHTBOX TOGGLE
// -------------------------- //

var LightboxToggle = (function(){
	
	var _self = {};
	
	function init(){
		var _eventType = ( $('html').hasClass('touch') ? 'touchstart' : 'click');
		
		$('.lightbox').on(_eventType,function(){
		    $('#lightbox').fadeIn();
		});

		$('#lightbox').on(_eventType,'.backdrop,.close-lightbox',function(){
		    $('#lightbox').fadeOut();
		});
	}
	
	_self = {
		init : init
	};
	
	return _self;
	
})();




// ------------------------------------- //
// MARQUEE
// ------------------------------------- //

var Marquee = (function(){
	
	var _self = {},
		_footer,
		_marquee,
		_marqueeWidth,
		_speed = 25,
		_timeout,
		_aniTimeout,
		_originPos = 0;
	
	function init(){
		_footer = $('.marquee');
		if( _footer.length === 0 ){ return; }
		_marquee = _footer.children('.inner');
		
		addSeparators();
		
		initMarquee();
		bindEvents();
	} // init()
	
	function addSeparators(){
		_marquee.children('span').first().siblings().before(' &bull; ');
	}
	
	function bindEvents(){
	}

	function initMarquee(){
		
		setMarquee();
		ani2();
	}
	
	function setMarquee(){
		var _footerHeight = _footer.height();
		
		_footerWidth = _footer.width();
		_originPos = 0;
		
		_marquee
			.css({
				// left: _footerWidth+'px',
				fontSize   : Math.round(_footerHeight*.4)+'px',
				lineHeight : Math.round(_footerHeight*1)+'px',
				padding    : '0 0 0 '+_footerWidth+'px',
				'-webkit-transform-origin' : '0px 0px',
				'-webkit-transform' : 'translate3d(0px, 0px, 0px) scale(1)'
			})
			.show();
			
		_marqueeWidth = _marquee.outerWidth();
	}
	
	function animateScrollLeft(){
		// $('footer')[0].scrollLeft += 1;
		
		// if( $('footer')[0].scrollLeft >= _marqueeWidth ){
		// 	$('footer')[0].scrollLeft = 0;
		// }
		
		// setTimeout(animateScrollLeft,20);
	}
	
	function resetMarquee(){
		_originPos = 0;
		_marquee.css({
				'-webkit-transform' : 'translate3d(0px, 0px, 0px) scale(1)',
				'-moz-transform'    : 'translate3d(0px, 0px, 0px) scale(1)'
			});
	}
	
	function ani2(){
		_originPos -= 2;
		_marquee.css({
				'-webkit-transform' : 'translate3d('+_originPos+'px, 0px, 0px) scale(1)',
				'-moz-transform'    : 'translate3d('+_originPos+'px, 0px, 0px) scale(1)'
			});
		
		if( Math.abs(_originPos) >= _marqueeWidth ){
			_originPos = 0;
		}
			
		_aniTimeout = setTimeout(ani2,_speed);
	}
	
	_self = {
		init : init,
		ani  : animateScrollLeft
	};
	
	return _self;
	
})();




// -------------------------- //
// HELPER FUNCTIONS
// -------------------------- //

var Helper = (function(){
	
	var _self = {};
	
	function init(){
		page.example.init();
	}
	
	_self = {
		init : init
	};
	
	return _self;
	
})();



$(function(){
	FullBleedGallery.init();
});

var FullBleedGallery = (function(){

	var _self = {},
		gallery,
		slides,
		delay = 20000,
		current = 0,
		max     = 0;


	function init(){
		gallery = $('#full_bleed_gallery');


		if( gallery.length === 1 ){
			slides = gallery.find('.item');
			max = slides.length;
			if( max > 1 ){
				slides.first().removeClass('off-left');
				setTimeout(autoPlay,delay);
			}
		}
	}


	function autoPlay(){
		moveRight();
		setTimeout(autoPlay,delay);
	}


	function moveRight(){
		var next      = ( current+1 < max ? current+1 : 0 ),
			nextSlide = slides.eq(next);

		nextSlide.removeClass('animate off-right').addClass('off-left');

		setTimeout(function(){

			slides.eq(current).addClass('animate off-right');

			slides.eq(next).addClass('animate').removeClass('off-left');

			current = next;

		},0);


		

		
	}


	_self = {
		init : init,
		moveRight : moveRight
	};

	return _self;


}());





$(function(){
	SwipeGallery.init();
});



var SwipeGallery = (function(){

	var _self = {},
		gallery,
		scroller,
		current       = 0,
		max           = 0,
		autoPlayMode  = true,
		autoPlayDelay = 6500,
		autoPlayTimeout,
		restartAutoPlayTimer,
		restartAfter  = 15000,
		scrollSpeed   = 500;



	function init(){

		gallery = $('#swipe_gallery');
		
		if( gallery.length === 1 ){

			wrap  = gallery.find('.item_wrap');
			items = gallery.find('.item');
			

			max = items.length;

			if( max > 1 ){
				wrap.css({
					width : items.length * 768 + 'px'
				});

				startIScroll();
				bindEvents();
				autoPlayTimeout = setTimeout(autoPlayer,autoPlayDelay);
			}
		}
	}



	function bindEvents(){

		gallery.on('touchstart mousedown', function(){
			// console.log('AUTO PLAY OFF');
			autoPlayMode = false;
			clearTimeout(autoPlayTimeout);
			clearTimeout(restartAutoPlayTimer);
		}).on('touchend mouseup', function(){
			// console.log('RESTART TIMEER');
			restartAutoPlayTimer = setTimeout(restartAutoPlay,restartAfter);
		});

	}


	function scrollToPage(x){

		scroller.scrollToPage(x,0,scrollSpeed);
	}


	function startIScroll(){
		scroller = new iScroll(gallery[0],{
			snap     : '.item',
			momentum : false,
			vScroll  : false
		});
	}


	function autoPlayer(){
		if( autoPlayMode ){
			// console.log('AUTOPLAYING');
			current = ( current+1 < max ) ? current+1 : 0;
			scrollToPage(current);
			autoPlayTimeout = setTimeout(autoPlayer,autoPlayDelay);
		}
	}

	function restartAutoPlay(){
		// console.log('RESTARTING AUTO PLAY');
		if( !autoPlayMode ){
			clearTimeout(restartAutoPlayTimer);
			current = $.inArray(scroller.x,scroller.pagesX) || 0;
			// console.log('starting at: '+current);
			autoPlayMode = true;
			autoPlayer();
		}
	}


	_self = {
		init : init,
		scroller : function(){ return scroller; }
	};

	return _self;

}());