var bodyParser = require('body-parser'),
	mongoControl = require('../database/mongocontrol'),
	router = require('express').Router(),
	tokenHandler = require('../database/jwthandler');

router.use(bodyParser.json());

router.use(function(req,res,next){
	var payload = tokenHandler.verifyLogin(req.body.token);
	if(payload == null ){
		res.json({"error":"Invalid token"});
	}else{
		next();
	}
});

router.post('/find',function(req,res){
	var user_id = tokenHandler.getPayload(req.body.token).id;
	var data = {
		id: user_id
	}
	mongoControl.findStories(data,function(result){
		res.json(result);
	});
});

router.post('/add',function(req,res){
	var user_id = tokenHandler.getPayload(req.body.token).id;
	var data = {
		id:user_id,
		title: req.body.title,
		description: req.body.description
	}

	mongoControl.addStory(data,function(result){
		res.json(result);
	});
});

router.post('/delete',function(req,res){
	mongoControl.deleteStory({story_id:req.body.story_id},function(result) {
		res.json(result);
	});
});

module.exports.router = router;