const express = require('express');
const path = require('path');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const cameraRoutes = require('./routes/camera');
const teddyRoutes = require('./routes/teddy');
const furnitureRoutes = require('./routes/furniture');

const Teddy = require('./models/Teddy');

const app = express();

mongoose.connect('mongodb+srv://Yann:H1MJOutHwLM9lluQ@cluster0.ayvcw.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.set('view engine', 'html');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  //res.set("Content-Security-Policy", "default-src * self blob: data: gap:; style-src * self 'unsafe-inline' blob: data: gap:; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap:; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src * self blob: data: gap:;");
  next();
});


app.use(express.static(__dirname + '/views'));
express.static('views')

app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy-Report-Only',
    " font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css; frame-src 'self';"
  );
  next();
});



/*
app.post('/api/teddies', (req, res, next) => {
  delete req.body._id;
  const teddy = new Teddy({
    ...req.body
  });
  teddy.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});
//On récupère tous les teddies
app.use('/api/teddies', (req, res, next) => {
  Teddy.find()
    .then(teddies => res.status(200).json(teddies))
    .catch(error => res.status(400).json({ error }));
});
//On récupère 1 teddy
app.get('/api/teddies/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(teddy => res.status(200).json(teddy))
    .catch(error => res.status(404).json({ error }));
});
*/


app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/js', express.static(path.join(__dirname, 'js')));


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(helmet());

app.use('/api/cameras', cameraRoutes);
app.use('/api/teddies', teddyRoutes);
app.use('/api/furniture', furnitureRoutes);



app.use(function(req, res, next){
  res.status(404);

  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { url: req.url });
    return;
  }
  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
});

module.exports = app;
