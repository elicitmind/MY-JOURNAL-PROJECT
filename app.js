const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose")
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: false
}));
app.use(express.static("public"));

const homeContent = "I realized that the meaning of my life is to achieve, learn and experience. I have to be disciplined and proactive! My character traits are the tools with which I conquer impossible task, despite of the results - there is an action and experience, my will was to act so I act and here comes my improvement - I CREATE. I GROW by doing, solving, achieving, falling, fixing and keep coming back. I went too far, you may not understand, there is no turning back on a way straight up to be God."

mongoose.connect("mongodb+srv://elicitmind:WLsmyF7WS7AvAjJm@cluster0.wjc84.mongodb.net/blogDb?retryWrites=true&w=majority", {
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
  }})


  // console.log(req.body.newPostTitle)
  // console.log(req.body.newPostBody)



  res.redirect("/")
})

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = req.params.postName;
  allPosts.forEach(e => {
    if (_.lowerCase(e.title) == _.lowerCase(requestedTitle)) {
      res.render("post.ejs", {
        title: e.title,
        content: e.content,

      })
    }
  })
})










app.listen(3000, function () {
  console.log("Server started on port 3000");
});