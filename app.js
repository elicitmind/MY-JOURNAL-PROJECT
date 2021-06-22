const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({
  extended: false
}));
app.use(express.static("public"));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://elicitmind:WLsmyF7WS7AvAjJm@cluster0.wjc84.mongodb.net/blogDb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const homeContent = "I realized that the meaning of my life is to achieve, learn and experience. I have to be disciplined and brave! My character traits are the tools with which I conquer impossible task, despite the results - there is action and experience, my will was to act so I act and here comes my improvement. I grow by doing, trying, achieving, falling and keep coming back. I went too far, you may not understand, there is no turning back on a way straight up to be God."
const allPosts = []


app.get("/", (req, res) => {
  res.render("home", {
    homeContent: homeContent,
    allPosts: allPosts
  })

})

app.get("/about", (req, res) => {
  res.render("about.ejs", {
    aboutContent: aboutContent
  })
})

app.get("/contact", (req, res) => {
  res.render("contact.ejs", {
    contactContent: contactContent
  })
})

app.get("/compose", (req, res) => {
  res.render("compose.ejs")
})

app.post("/compose", (req, res) => {
  const newPost = {
    title: req.body.newPostTitle,
    content: req.body.newPostBody,
    //renteredTitle: _.lowerCase(req.body.newPostTitle)
  }
  allPosts.push(newPost)

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