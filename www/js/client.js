(function(window, jQuery){
	var $ = jQuery;
	var io = window.io;
	
	
	$(document).ready(function(){
		var sock = io.connect('/',{
			'sync disconnect on unload': true
		});
		var box = $('#box');
		var chatForm = $('#chat');
		var field = $('#field');
		
		sock.on('message',function(data){
			box.append('<p>'+data+'</p>');
		});
		
		chatForm.on('submit',function(e){
			e.preventDefault();
			var message = field.attr('value');
			field.attr('value', '');
			sock.emit('send',message);
		});
	});
})(window, jQuery);