var express = require('express');
var router = express.Router();
const model = require('../models/model')
const baseURL = "http://localhost:3000"; 
const task2 = require('./func');



router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/upload", task2.single("file"), async function (req, res, next) {
  try {
    if (!req.file) {
      return res.status(404).send("no file founded");
    }
    const { username, userdescription } = req.body; 
    const { filename } = req.file; 
    const imagePath = '/images/photos/' + filename; 
    const post = await model.create({
      username,
      userdescription,
      image: imagePath 
    });
res.redirect('/posts')
  } catch (error) {
    console.error("Error in /upload:", error);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/posts", async function (req, res, next) {
  try {
    const posts = await model.find();
    posts.forEach(post => {
      post.image = baseURL + post.image; 
    });
    res.render("posts", { posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/posts/:postId", async function (req, res, next) {
  try {
    const postId = req.params.postId;
    const deletedPost = await model.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
