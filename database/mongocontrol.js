var mongoose = require('mongoose');
var tokenHandler = require('./jwthandler');
var globals = require('../helper/globals');

mongoose.connect(globals.mongo_url);

var Story = require('../models/story').Story;

function findStories(data,response){
	var resultData = {
		success: false,
		error:null,
		stories:[]
	}
	Story.find({user_id:data.id},function(err,stories){
		if(err){
			resultData.error = err;
		}else{
			resultData.success = true;
			resultData.stories = stories;	
		}
		response(resultData);
	});
}

function addStory(data,response){
	var resultData = {
		success : false,
		error: null,
		id:null
	}	
	Story.create({
		user_id: data.id,
		title : data.title,
		description : data.description
	},function(err,story){
		if(err){
			resultData.error = err;
		}else if(story){
			resultData.id = story._id;
			resultData.success = true;
		}
		response(resultData);
	});
}

function deleteStory(data,response){
	var resultData = {
		success : false,
		error: null,
		id:null
	}	
	Story.remove({_id : data.story_id},function(err,story){
		if(err){
			resultData.error = err;
		}
		response(resultData);
	});	
}

module.exports.findStories = findStories;
module.exports.addStory = addStory;
module.exports.deleteStory = deleteStory;