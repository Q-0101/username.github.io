const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // serve frontend

let waterData = [];
const MAX_READINGS = 2000; // store more readings for scrolling

// Arduino POST
app.post('/api/water-level', (req, res) => {
  const { level } = req.body;
  if (level === undefined) return res.status(400).send('Missing level');

  const timestamp = new Date().toISOString();
  waterData.push({ timestamp, level });

  if (waterData.length > MAX_READINGS) waterData.shift();

  res.send({ success: true });
});

// Frontend GET
app.get('/api/water-level', (req, res) => {
  res.json(waterData);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
