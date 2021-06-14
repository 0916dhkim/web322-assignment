const express = require('express');
const ExpressHandlebars = require('express-handlebars');
const Sass = require('node-sass-middleware');
const path = require('path');

const PORT = process.env.PORT || 8082;

const app = express();

// Template engine.
app.engine('handlebars', ExpressHandlebars());
app.set('view engine', 'handlebars');

// Register middlewares.
app.use(Sass({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public', 'styles'),
  prefix: '/styles',
}));
app.use(express.static('public'));

// Routes.
app.get('/', (req, res) => {
  res.render('home');
});

// Start server.
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Listening to http://localhost:${PORT}/`);
  }
});

