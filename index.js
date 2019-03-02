const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const app = express();
const path = require("path");
const dburl = "mongodb://dsckiet:dsc123@ds153495.mlab.com:53495/dsckiet-demo-db";
const Blog = require("./models/Blog");

app.use(bodyparser.urlencoded({extended:true}));
mongoose.Promise = global.Promise;

mongoose.connect(dburl, (err) => {
	if(err) console.log(err);
	console.log("mlab connected");
});

app.use(express.static(path.join(__dirname,'public')));

app.get("/", (req, res) => {
	Blog.find({}, (err, blog) => {
		if(err) console.log(err);
		console.log(blog);
	})
	res.send("hi");
});

app.get("/about", (req, res) => {
	res.render("index.ejs");
});

app.get("/thanks",(req,res) => {
	res.render("thanks.ejs");
});

app.post("/index", (req, res) => {
	Blog.findOne({title: req.body.blogtitle}, (err, entry) => {
		if(err) res.render("thanks.ejs",{message: "error"});
		if(entry) res.render("thanks.ejs", {message: "already registered"});
		else{
			Blog.create({title: req.body.blogtitle, text: req.body.blogtext, category: req.body.blogcategory}, (err, done) => {
				if(err) res.render("thanks.ejs",{message: "error"});
				else res.render("thanks.ejs",{message: "success"});
			});
		}
	});
});

app.listen(3000, () => console.log("server started"));

