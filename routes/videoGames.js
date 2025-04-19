const express = require('express');
const router = express.Router();
const VideoGame = require('../models/VideoGame');
const renderGames = require('../utils/renderGames');
const renderPercent = require('../utils/renderPercent');
const renderSalesPercentage = require('../utils/renderSalesPercentage'); // 👈 nuevo render
const renderTopGenreSummary = require('../utils/renderTopGenreSummary');
const renderTopGameByGenre = require('../utils/renderTopGameByGenre');

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

// Top X de un año según tipo de venta
// Ejemplo: http://localhost:3000/videogames/top/year/2005/NA_Sales/5?format=html
router.get('/top/year/:year/:field/:limit', async (req, res) => {
  const year = parseInt(req.params.year);
  const field = req.params.field;
  const limit = parseInt(req.params.limit);
  let mssg = ""
  switch (field) {
    case 'NA_Sales':
      mssg = " ventas en Norteamérica"
      break;
    case 'EU_Sales':
      mssg = "ventas en Europa"
      break;
    case 'JP_Sales':
      mssg = "ventas en Japón"
      break;
    case 'Other_Sales':
      mssg = "ventas en otros paises"
      break;
    case 'Global_Sales':
      mssg = "ventas globales"
      break;
    default:
      mssg = "Campo no válido"
      break;
  }
  const allowedFields = ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales', 'Global_Sales'];
  if (!allowedFields.includes(field)) {
    return res.status(400).json({ message: `Campo no válido. Usa uno de: ${allowedFields.join(', ')}` });
  }

  try {
    const results = await VideoGame.find({ Year: year })
      .sort({ [field]: -1 })
      .limit(limit);

    if (req.query.format === 'html') {
      res.send(renderGames(`Top ${limit} de ${year} ordenado por ${mssg}`, results, field));
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el top de ventas por año y campo', error: err });
  }
});

//Filtrar por ventas percentuales de Global_sales
//http://localhost:3000/videogames/percentage/NA/1/55/?format=html
router.get('/percentage/:region/:min/:max', async (req, res) => {
  const region = req.params.region.toUpperCase(); // NA, EU, or JP
  const min = parseFloat(req.params.min);
  const max = parseFloat(req.params.max);

  // Regiones válidas
  const validRegions = ['NA', 'EU', 'JP'];
  if (!validRegions.includes(region)) {
    return res.status(400).json({ message: 'Región inválida. Usa NA, EU o JP.' });
  }
  const regionField = `${region}_Sales`;
  try {
    const results = await VideoGame.aggregate([
      {
        $addFields: {
          percentage: {
            $multiply: [
              { $divide: [`$${regionField}`, "$Global_Sales"] },
              100
            ]}}},
      {
        $match: {
          percentage: { $gte: min, $lte: max }
        }
      }]);
    if (req.query.format === 'html') {
      res.send(renderPercent(`Videojuegos con ventas en ${region} entre ${min}% y ${max}% del total`, results));
    } else {
      res.json(results);
    }
  } catch (err) {
    res.status(500).json({ message: 'Error al filtrar por porcentaje de región', error: err });
  }
});

//Porcetanje de ventas por región y año
// Ejemplo: http://localhost:3000/videogames/sales-percentage?format=html
router.get('/sales-percentage', async (req, res) => {
  try {
    // Obtener todos los videojuegos agrupados por año
    const allGames = await VideoGame.find();

    const salesByYear = {};

    // Agrupar ventas por año
    allGames.forEach(game => {
      const year = game.Year;
      if (!year) return;

      if (!salesByYear[year]) {
        salesByYear[year] = {
          NA_Sales: 0,
          EU_Sales: 0,
          JP_Sales: 0,
          Other_Sales: 0,
          Total: 0
        };
      }

      salesByYear[year].NA_Sales += game.NA_Sales || 0;
      salesByYear[year].EU_Sales += game.EU_Sales || 0;
      salesByYear[year].JP_Sales += game.JP_Sales || 0;
      salesByYear[year].Other_Sales += game.Other_Sales || 0;
    });

    // Calcular porcentajes
    const percentages = Object.entries(salesByYear).map(([year, sales]) => {
      const total = sales.NA_Sales + sales.EU_Sales + sales.JP_Sales + sales.Other_Sales;
      return {
        Year: parseInt(year),
        NA: ((sales.NA_Sales / total) * 100).toFixed(2),
        EU: ((sales.EU_Sales / total) * 100).toFixed(2),
        JP: ((sales.JP_Sales / total) * 100).toFixed(2),
        Other: ((sales.Other_Sales / total) * 100).toFixed(2),
      };
    }).sort((a, b) => a.Year - b.Year);

    if (req.query.format === 'html') {
      res.send(renderSalesPercentage('Porcentaje de ventas por región y año', percentages));
    } else {
      res.json(percentages);
    }

  } catch (err) {
    res.status(500).json({ message: 'Error al calcular los porcentajes de ventas', error: err });
  }
});

// Obtener el género más vendido por año y región
// Ejemplo: http://localhost:3000/videogames/top-genre/year/region/NA_Sales?format=html
router.get('/top-genre/year/region/:region', async (req, res) => {
  const region = req.params.region;
  const allowedFields = ['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales'];

  if (!allowedFields.includes(region)) {
    return res.status(400).json({ message: `Región no válida. Usa: ${allowedFields.join(', ')}` });
  }

  try {
    const allGames = await VideoGame.find();
    const salesByYearGenre = {};

    allGames.forEach(game => {
      const { Year, Genre } = game;
      const sales = game[region] || 0;
      if (!Year || !Genre) return;

      if (!salesByYearGenre[Year]) salesByYearGenre[Year] = {};
      if (!salesByYearGenre[Year][Genre]) salesByYearGenre[Year][Genre] = 0;

      salesByYearGenre[Year][Genre] += sales;
    });

    const topGenres = Object.entries(salesByYearGenre).map(([year, genres]) => {
      const top = Object.entries(genres).sort((a, b) => b[1] - a[1])[0];
      return {
        Year: parseInt(year),
        Genre: top[0],
        Sales: top[1].toFixed(2)
      };
    }).sort((a, b) => a.Year - b.Year);

    if (req.query.format === 'html') {
      res.send(renderTopGenreSummary(`Top género por año en ${region}`, topGenres, ['Year', 'Genre', 'Sales']));
    } else {
      res.json(topGenres);
    }

  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el género más vendido por año y región', error: err });
  }
});

// Obtener el género más vendido por plataforma
// Ejemplo: http://localhost:3000/videogames/top-genre/platform?format=html
router.get('/top-genre/platform', async (req, res) => {
  try {
    const allGames = await VideoGame.find();
    const salesByPlatformGenre = {};

    allGames.forEach(game => {
      const { Platform, Genre, Global_Sales } = game;
      if (!Platform || !Genre) return;

      if (!salesByPlatformGenre[Platform]) salesByPlatformGenre[Platform] = {};
      if (!salesByPlatformGenre[Platform][Genre]) salesByPlatformGenre[Platform][Genre] = 0;

      salesByPlatformGenre[Platform][Genre] += Global_Sales || 0;
    });

    const topGenres = Object.entries(salesByPlatformGenre).map(([platform, genres]) => {
      const top = Object.entries(genres).sort((a, b) => b[1] - a[1])[0];
      return {
        Platform: platform,
        Genre: top[0],
        Global_Sales: top[1].toFixed(2)
      };
    });

    if (req.query.format === 'html') {
      res.send(renderTopGenreSummary(`Top género por plataforma`, topGenres, ['Platform', 'Genre', 'Global_Sales']));
    } else {
      res.json(topGenres);
    }

  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el género más vendido por plataforma', error: err });
  }
});

// Obtener el juego más vendido por género
// Ejemplo: http://localhost:3000/videogames/top-game/genre?format=html
router.get('/top-game/genre', async (req, res) => {
  try {
    const allGames = await VideoGame.find();
    const topByGenre = {};

    allGames.forEach(game => {
      const { Genre, Global_Sales } = game;
      if (!Genre) return;

      if (!topByGenre[Genre] || (Global_Sales > topByGenre[Genre].Global_Sales)) {
        topByGenre[Genre] = game;
      }
    });

    const result = Object.entries(topByGenre).map(([genre, game]) => ({
      Genre: genre,
      Name: game.Name,
      Platform: game.Platform,
      Year: game.Year,
      Publisher: game.Publisher,
      Global_Sales: game.Global_Sales.toFixed(2)
    }));

    if (req.query.format === 'html') {
      res.send(renderTopGameByGenre('Top juego por género', result));
    } else {
      res.json(result);
    }

  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el juego más vendido por género', error: err });
  }
});




module.exports = router;
