const express = require('express');
const db = require('./db');
const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.end('hello world');
});

app.get('/api/locals', (_, res) => {
  (async () => {
    try {
      const data = await db.getAll();
      res.json({
        code: 1,
        data,
      });
    } catch (err) {
      res.json({
        code: 0,
        message: err.message,
      });
    }
  })();
});

app.listen(3000, () => {
  console.log('listening on port 3000');
});
