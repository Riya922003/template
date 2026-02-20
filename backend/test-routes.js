// Simple test script to verify routes
const express = require('express');

const app = express();

// Test routes
app.get('/test/filters', (req, res) => {
  console.log('Test filters route hit');
  res.json({ message: 'Filters route working' });
});

app.get('/test/stats', (req, res) => {
  console.log('Test stats route hit');
  res.json({ message: 'Stats route working' });
});

app.get('/test/:id', (req, res) => {
  console.log(`Test ID route hit with id: ${req.params.id}`);
  res.json({ message: `ID route working with id: ${req.params.id}` });
});

app.listen(3001, () => {
  console.log('Test server running on port 3001');
  console.log('Test URLs:');
  console.log('- http://localhost:3001/test/filters');
  console.log('- http://localhost:3001/test/stats');
  console.log('- http://localhost:3001/test/123');
});