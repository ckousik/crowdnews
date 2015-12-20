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

module.exports.router = router;