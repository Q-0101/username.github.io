const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000; // Render port

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // serve frontend from /public

// In-memory storage for water levels
let waterData = [];

// Arduino sends POST data here
app.post('/api/water-level', (req, res) => {
  const { level } = req.body;
  if (level === undefined) return res.status(400).send('Missing level');

  const timestamp = new Date().toISOString();
  waterData.push({ timestamp, level });

  // Keep only last 50 readings
  if (waterData.length > 50) waterData.shift();

  console.log(`Received level: ${level}`);
  res.send({ success: true });
});

// Frontend GETs latest water data
app.get('/api/water-level', (req, res) => {
  res.json(waterData);
});

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
