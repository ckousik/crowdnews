var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
http = require('http').createServer(app);

app.use(bodyParser.json());

app.post('/',function(req,res){
	res.json({"home":"home"});
});

app.post('/login',function(req,res){
	res.json({
		"message":"login request from"+req.body.user
	});
});

app.post('/feed',function(req,res){
	res.json({
		"message":"feed for "+req.body.feed
	});
});

http.listen(process.env.PORT||3000);