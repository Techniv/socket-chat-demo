(function(window, jQuery){
	var $ = jQuery;
	var io = window.io;
	
	
	$(document).ready(function(){
		var sock = io.connect('/',{
			'sync disconnect on unload': true
		});
		var box = $('#box');
		var send = $('#send');
		var field = $('#field');
		
		sock.on('message',function(data){
			box.append('<p>'+data+'</p>');
		});
		
		send.on('click',function(){
			var message = field.attr('value');
			field.attr('value', '');
			sock.emit('send',message);
		});
	});
})(window, jQuery);