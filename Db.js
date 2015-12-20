var pg = require('pg');
var db_url = process.env.DATABASE_URL;
var client = new pg.Client(db_url);
var secret_key = process.env.SECRET_KEY;
var hash = require('./hash');
var jwt = require('jsonwebtoken');
var util = require('util');
var uuid = require('uuid');

client.connect(function (error) {
	console.log(error);
});

var users_online = {};

function authenticateLogin(username,password,response_function){
	var resultData = {
		success: false,
		error:null,
		token: null
	};
	var queryString = 'select * from users where username = \''+username+'\';';
	client.query(queryString,function(error,result){
		if(error){
			console.log(">>>Login error: "+error);
			resultData.error = error;
		}
		if(result.rows[0])
		{
			var tryHash = hash.digest(password+result.rows[0].salt);
			if(tryHash == result.rows[0].hash){
				//generate token
				var payload = {
					"id":result.rows[0].id,
					"iss":"crowdnews-test",
					"username":result.rows[0].username,
					"permissions":["post","read"]
				};
				var token = jwt.sign(payload,secret_key,{"expiresIn":"2 days"});
				resultData.success = true;
				resultData.error = null;
				resultData.token = token;
				users_online[payload.id]=true;
			}
		}

		response_function(resultData);
	});
}

function signUp(data,response_function){
	var resultData = {
		success: false,
		error: null
	}
	var id = uuid.v4();
	var hashSaltPair = hash.getHashed(data.password);
	var queryString = util.format('insert into users values(\'%s\',\'%s\',\'%s\',\'%s\',\'%s\');',id,data.username,hashSaltPair.hash,hashSaltPair.salt,data.email);
	client.query(queryString,function(error,result){
		if(error){
			console.log(">>>Signup error: "+error);
			resultData.error = error;
		}
		if(result){
			resultData.success = true;
		}
		response_function(resultData);
	});
}

function signOut(data,response_function){
	var resultData = {
			success : false,
			error: null
	}
	try{
		var payload = jwt.verify(data.token,secret_key);
		if(users_online[payload.id]){
			delete users_online[payload.id];
			resultData.success = true;
		}
	}catch(error){
		resultData.error = error;
	}finally{
		response_function(resultData);
	}
}

function isLoggedIn(payload){
	if(users_online[payload.id]){
		return true;
	}else{
		return false;
	}	
}

module.exports.authenticateLogin = authenticateLogin;
module.exports.signUp = signUp;
module.exports.signOut = signOut;
module.exports.isLoggedIn = isLoggedIn;