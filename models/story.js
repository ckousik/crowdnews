var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var postSchema = require('./posts').postSchema;

var storySchema = new Schema({
	user_id:String,
	story_id : String,
	title : String,
	description: String,
	
	created_at : {
		type:Date,
		default:Date.now
	},

	updated_at: {
		type:Date,
		default:Date.now
	}
});