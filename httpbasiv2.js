var http = require('http');
var fs = require("fs");

var server = http.createServer(function(req, res) {
    var auth = req.headers['authorization'];          
    console.log("Authorization Header is: ", auth);
	if(!auth) {     
		res.statusCode = 401;
		res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
		res.end();
	} else if(auth) {
		var tmp = auth.split(' '); 
		var buf = new Buffer(tmp[1], 'base64');                 
		var plain_auth = buf.toString();
		console.log("Decoded Authorization ", plain_auth);
		var creds = plain_auth.split(':');      // split on a ':'
        var username = creds[0];
        var password = creds[1];
		if((username == 'user1') && (password == 'user1')) {  
			if(req.url == "/"){
				fs.readFile("./blue_sycale.html",function(err,data){
				res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
				res.end(data);
			});
		}
       	 } else {
            res.statusCode = 401; 
			res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
			res.end();
        }
    }
}).listen(5000, function() { console.log("Server Listening on http://localhost:5000/"); });