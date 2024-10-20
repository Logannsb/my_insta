import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // Récupérer les posts depuis le backend
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Erreur lors de la récupération des posts:', err);
      }
    };

    fetchPosts();
  }, []);

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('user'); // Supprimer l'utilisateur du localStorage
    navigate('/login'); // Rediriger vers la page de connexion
  };

  return (
    <Box sx={{ maxWidth: 800, margin: 'auto', paddingTop: 10 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h4">Fil d'actualité</Typography>
        <Box>
          <Button component={Link} to="/profile" variant="outlined" sx={{ marginRight: 2 }}>
            Mon profil
          </Button>
          <Button onClick={handleLogout} variant="contained" color="secondary">
            Se déconnecter
          </Button>
        </Box>
      </Box>

      {/* Afficher les posts */}
      {posts.length > 0 ? (
        posts.map((post) => (
          <Box key={post._id} sx={{ marginBottom: 4, border: '1px solid #ddd', padding: 2 }}>
            <Typography variant="h6">{post.username}</Typography>
            <Typography variant="body1">{post.description}</Typography>
            {post.images && post.images.map((image, index) => (
              <img key={index} src={image} alt="post" style={{ width: '100%', marginTop: 8 }} />
            ))}
          </Box>
        ))
      ) : (
        <Typography variant="body1">Aucun post disponible pour le moment.</Typography>
      )}
    </Box>
  );
};

export default Feed;
