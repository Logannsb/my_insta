import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', formData);
      localStorage.setItem('user', JSON.stringify(res.data)); // Stocker les informations utilisateur dans localStorage
      setUser(res.data); // Mettre à jour l'état utilisateur
      navigate('/feed'); // Rediriger vers le feed
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la connexion');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', paddingTop: 10 }}>
      <Typography variant="h4" align="center">Connexion</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" fullWidth>
          Se connecter
        </Button>
      </form>
    </Box>
  );
};

export default Login;
