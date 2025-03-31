const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/sales', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

const videoGameRoutes = require('./routes/videoGames');
app.use('/videogames', videoGameRoutes);


app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}/videogames`);
});
