
var http = require("http");
var fs = require("fs");


var server = http.createServer(function(req,res){
	if(req.url == "/"){
		fs.readFile("./blue_sycale.html",function(err,data){

			res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
			res.end(data);
		});
	}
});

server.listen(3000,"192.168.0.172");