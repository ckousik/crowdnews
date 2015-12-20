var mongoose = require('mongoose');
var tokenHandler = require('./jwthandler');
var globals = require('../helper/globals');

mongoose.connect(globals.mongo_url);

var Story = require('../models/story').Story;

function findStories(token,response){
	var resultData = {
		success: false,
		error:null,
		stories:[]
	}
	var payload = tokenHandler.verifyLogin(token);
	if(payload == null){
		resultData.error = "Unable to verify login";
		response.json(resultData);
	}
	Story.find({user_id:userid},function(err,stories){
		if(err){
			resultData.error = err;
			response.json(resultData);
		}
		resultData.success = true;
		resultData.stories = stories;
		response.json(resultData);
		return resultData;
	});
}

function addStory(data,response){
	var resultData = {
		success : false,
		error: null,
		id:null
	}	
	var payload = verifyLogin(data.token);
	if(payload == null){
		resultData.error = "Unable to verify login";
		response.json(resultData);
		return resultData;
	}

	Story.create({
		user_id: payload.id,
		title : data.title,
		description : data.description
	},function(err,story){
		if(err){
			resultData.error = err;
			response.json(resultData);
			return resultData;
		}
		if(story){
			resultData.id = story._id;
			resultData.success = true;
			response.json(resultData);
			return resultData;
		}
	});
}

function deleteStory(data,response){
	var resultData = {
		success : false,
		error: null,
		id:null
	}	
	var payload = verifyLogin(data.token);
	if(payload == null){
		resultData.error = "Unable to verify login";
		response.json(resultData);
		return resultData;
	}
	Story.remove({_id : data.story_id},function(err,story){
		if(err){
			resultData.error = err;
			response.json(resultData);
			return resultData;
		}
	});	
}

module.exports.findStories = findStories;
module.exports.addStory = addStory;