(function(window, jQuery){
	var $ = jQuery;
	
	
	$(document).ready(function(){
		var sock = io.connect(); // defaut connection.
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