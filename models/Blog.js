const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
	title: String,
	text: String,
	category: String
});

module.exports = Blog = mongoose.model('blog', blogSchema);