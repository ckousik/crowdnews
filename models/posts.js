var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
	id:String,
	title:String,
	content:String,
	created_at : {
		type:Date,
		default:Date.now
	},
	updated_at : {
		type:Date,
		default:Date.now
	},

	location: {
		latitude: {
			type:Number,
			default : 0.0,
			max: 90.0,
			min :-90.0
		},
		longitude: {
			type:Number,
			default : 0.0,
			max: 180.0,
			min: -180.0
		}
	},
	closest_served_location : String,
	user_id:String,
	story_id:String
});

module.exports.postSchema = postSchema;