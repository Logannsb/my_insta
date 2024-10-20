import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    description: '',
    images: ''
  });
  const user = JSON.parse(localStorage.getItem('user')); // Récupérer l'utilisateur connecté

  // Récupérer les posts de l'utilisateur connecté
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts?username=${user.username}`);
        setPosts(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des posts utilisateur:', err);
      }
    };

    fetchUserPosts();
  }, [user.username]);

  // Gérer le changement de données dans le formulaire
  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  // Envoyer le nouveau post au backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const post = {
        username: user.username,
        description: newPost.description,
        images: newPost.images.split(',') // Transformer la chaîne en tableau d'URLs
      };
      await axios.post('http://localhost:5000/api/posts', post);
      setPosts([...posts, post]); // Mettre à jour la liste des posts avec le nouveau post
      setNewPost({ description: '', images: '' }); // Réinitialiser le formulaire
    } catch (err) {
      console.error('Erreur lors de la création du post:', err);
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', paddingTop: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4">Profil de {user.username}</Typography>
        <Button component={Link} to="/feed" variant="outlined">
          Retour au feed
        </Button>
      </Box>

      {/* Formulaire pour ajouter un post */}
      <Box sx={{ marginTop: 4, marginBottom: 4 }}>
        <Typography variant="h6">Ajouter un nouveau post</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Description"
            name="description"
            value={newPost.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="URLs d'images (séparées par des virgules)"
            name="images"
            value={newPost.images}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" fullWidth>
            Ajouter le post
          </Button>
        </form>
      </Box>

      {/* Afficher les posts de l'utilisateur */}
      <Box>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Box key={post._id} sx={{ marginBottom: 4, border: '1px solid #ddd', padding: 2 }}>
              <Typography variant="h6">{post.username}</Typography>
              <Typography variant="body1">{post.description}</Typography>
              {post.images && post.images.map((image) => (
                <img key={image} src={image} alt="post" style={{ width: '100%', marginTop: 8 }} />
              ))}
            </Box>
          ))
        ) : (
          <Typography variant="body1">Vous n'avez encore publié aucun post.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default Profile;
