const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var slug = require('slugs');

const storeSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Please Enter a Store Name'
	},
	slug: String,
	description: {
		type: String,
		trim: true
	},
	tags: [String]
});

storeSchema.pre('save', function(next) {
	if(!this.isModified('name')) {
		next(); // skips
		return; // stops this function from running 
	}
	this.slug = slug(this.name);
	next();

	// TO-DO Make more resillient so slugs are unique
});
module.exports = mongoose.model('Store', storeSchema);