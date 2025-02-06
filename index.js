const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Middleware to parse JSON bodies
app.use(express.json());

const items = ['Apple', 'Banana', 'Orange'];

app.get('/items', (req, res) => {
  res.json(items);
});

app.post('/items', (req, res) => {
  const newItem = req.body.item;
  items.push(newItem);
  res.json(items);
});

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/about', (req, res) => {
  res.send('About Us');
});

// Define a POST route
app.post('/submit', (req, res) => {
  const data = req.body;
  res.send(`Received: ${JSON.stringify(data)}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
