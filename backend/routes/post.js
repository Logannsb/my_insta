const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Assure-toi que tu as un modèle Post

// Route GET pour récupérer tous les posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find(); // Récupérer tous les posts dans la collection
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Route POST pour créer un post
router.post('/posts', async (req, res) => {
    const { username, description, images } = req.body;
  
    try {
      const post = new Post({ username, description, images });
      await post.save();
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  router.get('/posts', async (req, res) => {
    const { username } = req.query;
  
    try {
      let posts;
      if (username) {
        // Si un nom d'utilisateur est fourni, filtrer les posts par cet utilisateur
        posts = await Post.find({ username });
      } else {
        // Sinon, renvoyer tous les posts
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
module.exports = router;
