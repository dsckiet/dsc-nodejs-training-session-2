const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();
const dburl = "mongodb://dsckiet:dsc123@ds153495.mlab.com:53495/dsckiet-demo-db";
const Blog = require("./models/Blog");

app.use(bodyparser.urlencoded({extended:true}));
mongoose.Promise = global.Promise;

mongoose.connect(dburl, (err) => {
	if(err) console.log(err);
	console.log("mlab connected");
});


app.get("/", (req, res) => {
	Blog.find({}, (err, blog) => {
		if(err) console.log(err);
		console.log(blog);
	})
	res.send("hi");
});

app.post("/index", (req, res) => {
	console.log(req.body);
	Blog.create({title: req.body.blogtitle, text: req.body.blogtext}, (err, done) => {
		if(err) console.log(err);
		else res.send("done")
	});
});


app.get("/about", (req, res) => {
	res.render("index.ejs");
});

app.listen(3000, () => console.log("server started"));

