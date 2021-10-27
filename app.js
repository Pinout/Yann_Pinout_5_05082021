const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const cameraRoutes = require('./routes/camera');
const teddyRoutes = require('./routes/teddy');
const furnitureRoutes = require('./routes/furniture');

const Teddy = require('./models/Teddy');

const app = express();

app.set('view engine', 'html');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use(express.static(__dirname + '/views'));
express.static('views')

//On récupère tous les teddies
app.get('/api/teddies', (req, res, next) => {
  Teddy.find()
    .then(teddies => res.status(200).json(teddies))
    .catch(error => res.status(400).json({ error }));
});
//On récupère 1 teddy
app.get('/api/teddies/:id', (req, res, next) => {
  Teddy.findById({ _id: req.params.id })
    .then(teddy => res.status(200).json(teddy))
    .catch(error => res.status(404).json({ error }));
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

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

