var bodyParser = require('body-parser');
var db = require('../middleware/Db');

var router = require('express').Router();
router.use(bodyParser.json());

router.get('/',function (req,res) {
	res.json({
		"message":"Hello"
	});
});

router.post('/login',function(req,res){
	db.authenticateLogin(req.body.username,req.body.password,function(result){
		res.json(result);
	});
});

router.post('/logout',function(req,res){
	var data = {
		"token":req.body.token
	}
	db.logout(data,function(result){
		res.json(result);
	});
});

router.post('/signup',function(req,res){
	var data = {
		"username":req.body.username,
		"password":req.body.password,
		"email":req.body.email
	}
	db.signUp(data,function(result){
		res.json(result);
	});
});

module.exports.router = router;