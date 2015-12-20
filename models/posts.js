var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
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
	closest_served_location : {
		type:String,
		default: "none"
	}
	user_id:String
});

module.exports.postSchema = postSchema;
module.exports.Post = mongoose.model('Post',postSchema);