import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const Register = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
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
      const res = await axios.post('http://localhost:5000/auth/register', formData);
      console.log(res.data); // Voir les données de l'utilisateur créé
      localStorage.setItem('userId', res.data._id); // Stocker l'ID de l'utilisateur dans localStorage
      setUser(res.data); // Mettre à jour l'utilisateur dans l'état global
      navigate('/feed'); // Rediriger vers le feed après inscription
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', paddingTop: 10 }}>
      <Typography variant="h4" align="center">Inscription</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nom d'utilisateur"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
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
          S'inscrire
        </Button>
      </form>
    </Box>
  );
};

export default Register;
