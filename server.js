
console.log("Starting demo");

var http = require('http');
var sockLib = require('socket.io');
var fs = require('fs');
var pathLib = require('path');




/**********
 *  HTTP  *
 **********/

var app = http.createServer(handler);
function handler(req, res){
	var path = pathLib.resolve(__dirname+'/views'+req.url);
	
	fs.exists(path,function(exists){
		if(exists) var stat = fs.statSync(path);
		if(!stat || !stat.isFile()) path =  pathLib.resolve(__dirname+'/views/chat.html');
		console.log(path);
		console.log('-------------------------------------');
		
		fs.readFile(path,function(err,data){
			console.log(path);
			console.log(err);
			if(err){
				console.log(err)
				res.writeHead(500);
				res.end('ERROR');
				return;
			}
			
			res.writeHead(200);
			res.end(data);
		});
	});
}
//==================================================



/************
 *  SOCKET  *
 ************/

var sock = sockLib.listen(app);
sock.on('connection',function(client){
	console.log("Nouveau client");
	
	client.emit('message','Bienvenue');
	client.broadcast.emit('message','Nouvelle connexion');
	
	client.on('send',function(message){
		client.emit('message',message);
		client.broadcast.emit('message',message);
	});
	
	client.on('disconnect',function(){
		client.broadcast.emit('Un chatteur est parti.')
	})
});
//==================================================


//Launch HTTP serveur.
app.listen(85);
