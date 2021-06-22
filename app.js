const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")
const app = express();
require('dotenv').config()

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: false
}));
app.use(express.static("public"));

const homeContent = "I realized that the meaning of my life is to achieve, learn and experience. I have to be disciplined and proactive! My character traits are the tools with which I conquer impossible task, despite of the results - there is an action and experience, my will was to act so I act and here comes my improvement - I CREATE. I GROW by doing, solving, achieving, falling, fixing and keep coming back. I went too far, you may not yet understand, from where I am there is no turning back. The way to become a God."

mongoose.connect(process.env.MONGOOSE_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})


const postSchema = new mongoose.Schema({
  title: String,
  content: String
})

const Post = mongoose.model("Post", postSchema)

// const homePost = new Post({
//   title: "Home",
//   content: homeContent
// })







app.get("/", (req, res) => {
  Post.find({}, (err, results) => {
  res.render("home", {
    homeContent: homeContent,
    allPosts: results
  })
})
})


app.get("/about", (req, res) => {
  res.render("about.ejs", {
    aboutContent: "about me"
  })
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    contactContent: "elicitmind@gmail.com"
  })
})

app.get("/compose", (req, res) => {
  res.render("compose.ejs")
})

app.post("/compose", (req, res) => {
  const title = req.body.newPostTitle
  const content = req.body.newPostBody

  Post.create({
    title: title,
    content: content
  }, (err) => {
    if (err) {
      console.log(err)
  } else {
    console.log("success") 
    res.redirect("/")
  }})

 
})

app.get("/posts/:postId", (req, res) => {
  const requestedId = req.params.postId;
  Post.find({}, (err, results) => {
  results.forEach(e => {
    if (_.lowerCase(e._id) == _.lowerCase(requestedId)) {
      res.render("post.ejs", {
        title: e.title,
        content: e.content,

      })
    }
  })})
})










let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);