var bodyParser = require('body-parser'),
	mongoControl = require('../database/mongocontrol'),
	router = require('express').Router(),
	tokenHandler = require('../database/jwthandler');

router.use(bodyParser.json());

router.use(function(req,res,next){
	console.log("Token: " + req.body.token);
	var payload = tokenHandler.verifyLogin(req.body.token);
	if(payload == null ){
		res.json({"error":"Invalid token"});
	}else{
		next();
	}
});

router.post('/add',function(req,res){
	var user_id = tokenHandler.getPayload(req.body.token).id;
	var data = {
		story_id:req.body.story_id,
		id:user_id,
		title:req.body.title,
		content:req.body.content
	}
	mongoControl.addPost(data,function(result){
		res.json(result);
	});
});

module.exports.router = router;