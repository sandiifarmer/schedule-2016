;(function(){

var section = $('section');
var nav = $('nav>div');
nav.on('click', function( e ){
	var self = $( e.currentTarget );
	if( self.is('.checked') ) return;
	self.siblings('.checked').removeClass('checked');
	self.addClass('checked');

	var oldSec = section.filter('.checked');
	var newSec = section.eq( self.index() );
	oldSec.removeClass('checked').removeClass('solid');
	newSec.addClass('checked');
	setTimeout(function(){
		newSec.addClass('solid');
	}, 10);
});

var time = new Date();
var month = time.getMonth() + 1;
if( month !== 7 ) return;
var date = time.getDate();
nav.each(function(){
	var self = $( this );
	var _date = parseInt( self.text() );
	if( date === _date ){
		self.trigger('click');
	}
});

$('.to-top').on('click', function(){
	$( document.body ).scrollTop( 0 );
});

}());