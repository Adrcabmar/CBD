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

// Filtrar por plataforma
router.get('/platform/:platform', async (req, res) => {
  try {
    const results = await VideoGame.find({ Platform: req.params.platform });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por plataforma', error: err });
  }
});

// Filtrar por publisher
router.get('/publisher/:publisher', async (req, res) => {
  try {
    const results = await VideoGame.find({ Publisher: req.params.publisher });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por publisher', error: err });
  }
});

// Filtrar por año (despues de)
router.get('/after/:year', async (req, res) => {
  const year = parseInt(req.params.year);
  try {
    const results = await VideoGame.find({ Year: { $gt: year } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por año posterior', error: err });
  }
});

// Filtrar por año (antes de)
router.get('/before/:year', async (req, res) => {
  const year = parseInt(req.params.year);
  try {
    const results = await VideoGame.find({ Year: { $lt: year } });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por año anterior', error: err });
  }
});

// Filtrar por juegos de un año
router.get('/year/:year', async (req, res) => {
  const year = parseInt(req.params.year);
  try {
    const results = await VideoGame.find({ Year: year });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por año exacto', error: err });
  }
});

// Filtrar por juegos entre dos años
router.get('/between/:start/:end', async (req, res) => {
  const start = parseInt(req.params.start);
  const end = parseInt(req.params.end);
  try {
    const results = await VideoGame.find({
      Year: { $gte: start, $lte: end }
    });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por rango de años', error: err });
  }
});



module.exports = router;
