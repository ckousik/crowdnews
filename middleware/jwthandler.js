var jwt = require('jsonwebtoken');
var db = require('./Db');
var secret_key = require('../helper/globals').secret_key;

function getPayload(token){
	try{
		var payload = jwt.verify(token,secret_key);
		return payload;
	}catch(error){
		return null;
	}
}

function verifyLogin(token){
	try{
		var payload = jwt.verify(token,secret_key);
		if(db.isLoggedIn(payload))
			return payload;
		else
			return null;
	}catch(error){
		return null;
	}	
}

function signPayload(payload){
	return jwt.sign(payload,secret_key);
}

module.exports.getPayload = getPayload;
module.exports.signPayload = signPayload;