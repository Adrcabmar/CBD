const express = require('express');
const router = express.Router();
const VideoGame = require('../models/VideoGame');
const renderGames = require('../utils/renderGames');

//PARA VER HTML EN EL NAVEGADOR AÑADIR ?format=html A LA URL
// Ejemplo: http://localhost:3000/videogames?format=html

// Get de todo
router.get('/', async (req, res) => {
  try {
    const videojuegos = await VideoGame.find().limit(100);
    if (req.query.format === 'html') {
      res.send(renderGames('Todos los videojuegos (máx. 100)', videojuegos));
    } else {
      res.json(videojuegos);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los videojuegos', error: err });
  }
});

// Buscar por nombre
// Ejemplo: http://localhost:3000/videogames/search?name=Mario&format=html
router.get('/search', async (req, res) => {
  const name = req.query.name;
  const results = await VideoGame.find({ Name: { $regex: name, $options: 'i' } });
  if (req.query.format === 'html') {
    res.send(renderGames(`Búsqueda por nombre: ${name}`, results));
  } else {
    res.json(results);
  }
});

// Filtrar por género
// Ejemplo: http://localhost:3000/videogames/genre/Sports?format=html
router.get('/genre/:genre', async (req, res) => {
  const results = await VideoGame.find({ Genre: req.params.genre });
  if (req.query.format === 'html') {
    res.send(renderGames(`Filtrado por género: ${req.params.genre}`, results));
  } else {
    res.json(results);
  }
});

// Top X ventas
// Ejemplo: http://localhost:3000/videogames/top/10?format=html
router.get('/top/:limit', async (req, res) => {
  const limit = parseInt(req.params.limit);
  const results = await VideoGame.find().sort({ Global_Sales: -1 }).limit(limit);
  if (req.query.format === 'html') {
    res.send(renderGames(`Top ${limit} videojuegos más vendidos`, results));
  } else {
    res.json(results);
  }
});

// Filtrar por plataforma
// Ejemplo: http://localhost:3000/videogames/platform/PS4?format=html
router.get('/platform/:platform', async (req, res) => {
  try {
    const results = await VideoGame.find({ Platform: req.params.platform });
    if (req.query.format === 'html') {
      res.send(renderGames(`Filtrado por plataforma: ${req.params.platform}`, results));
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por plataforma', error: err });
  }
});

// Filtrar por publisher
// Ejemplo: http://localhost:3000/videogames/publisher/Nintendo?format=html
router.get('/publisher/:publisher', async (req, res) => {
  try {
    const results = await VideoGame.find({ Publisher: req.params.publisher });
    if (req.query.format === 'html') {
      res.send(renderGames(`Filtrado por publisher: ${req.params.publisher}`, results));
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por publisher', error: err });
  }
});

// Filtrar por año (después de)
// Ejemplo: http://localhost:3000/videogames/after/2000?format=html
router.get('/after/:year', async (req, res) => {
  const year = parseInt(req.params.year);
  try {
    const results = await VideoGame.find({ Year: { $gt: year } });
    if (req.query.format === 'html') {
      res.send(renderGames(`Videojuegos después de ${year}`, results));
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por año posterior', error: err });
  }
});

// Filtrar por año (antes de)
// Ejemplo: http://localhost:3000/videogames/before/2000?format=html
router.get('/before/:year', async (req, res) => {
  const year = parseInt(req.params.year);
  try {
    const results = await VideoGame.find({ Year: { $lt: year } });
    if (req.query.format === 'html') {
      res.send(renderGames(`Videojuegos antes de ${year}`, results));
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por año anterior', error: err });
  }
});

// Filtrar por juegos de un año
// Ejemplo: http://localhost:3000/videogames/year/2000?format=html
router.get('/year/:year', async (req, res) => {
  const year = parseInt(req.params.year);
  try {
    const results = await VideoGame.find({ Year: year });
    if (req.query.format === 'html') {
      res.send(renderGames(`Videojuegos del año ${year}`, results));
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por año exacto', error: err });
  }
});

// Filtrar por juegos entre dos años
// Ejemplo: http://localhost:3000/videogames/between/2000/2010?format=html
router.get('/between/:start/:end', async (req, res) => {
  const start = parseInt(req.params.start);
  const end = parseInt(req.params.end);
  try {
    const results = await VideoGame.find({
      Year: { $gte: start, $lte: end }
    });
    if (req.query.format === 'html') {
      res.send(renderGames(`Videojuegos entre ${start} y ${end}`, results));
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por rango de años', error: err });
  }
});

module.exports = router;
