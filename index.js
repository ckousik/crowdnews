var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
http = require('http').createServer(app),
db = require('./middleware/Db');

app.use(bodyParser.json());

app.post('/',function(req,res){
	res.json({"home":"home"});
});

app.post('/login',function(req,res){
	db.authenticateLogin(req.body.username,req.body.password,function(result){
		res.json(result);
	});
});


app.post('/signout',function(req,res){
	var data = {
		"token":req.body.token
	}
	db.signOut(data,function(result){
		res.json(result);
	});
});

app.post('/signup',function(req,res){
	var data = {
		"username":req.body.username,
		"password":req.body.password,
		"email":req.body.email
	}
	db.signUp(data,function(result){
		res.json(result);
	});
});

app.post('/feed',function(req,res){
	res.json({
		"message":"feed for "+req.body.feed
	});
});

http.listen(process.env.PORT||3000);