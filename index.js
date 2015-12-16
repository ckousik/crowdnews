var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
http = require('http').createServer(app),
db = require('./Db');

app.use(bodyParser.json());

app.post('/',function(req,res){
	res.json({"home":"home"});
});

app.post('/login',function(req,res){
	db.authenticateLogin(req.body.username,req.body.password,res);
});

app.post('/signup',function(req,res){
	var data = {
		"username":req.body.username,
		"password":req.body.password,
		"email":req.body.email
	}
	db.signup(data,res);
});

app.post('/feed',function(req,res){
	res.json({
		"message":"feed for "+req.body.feed
	});
});

http.listen(process.env.PORT||3000);