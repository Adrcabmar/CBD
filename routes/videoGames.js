const express = require('express');
const router = express.Router();
const VideoGame = require('../models/VideoGame');

//Get de todo
router.get('/', async (req, res) => {
  try {
    const videojuegos = await VideoGame.find().limit(100);
    res.json(videojuegos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los videojuegos', error: err });
  }
});

//Buscar por nombre
router.get('/search', async (req, res) => {
  const name = req.query.name;
  const results = await VideoGame.find({ Name: { $regex: name, $options: 'i' } });
  res.json(results);
});

//Filtrar por genero
router.get('/genre/:genre', async (req, res) => {
  const results = await VideoGame.find({ Genre: req.params.genre });
  res.json(results);
});

// Top X ventas
router.get('/top/:limit', async (req, res) => {
  const limit = parseInt(req.params.limit);
  const results = await VideoGame.find().sort({ Global_Sales: -1 }).limit(limit);
  res.json(results);
});


module.exports = router;
