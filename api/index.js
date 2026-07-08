let app;
try {
  app = require('../server/server.js');
} catch (err) {
  const express = require('express');
  app = express();
  app.all('*', (req, res) => {
    res.status(500).json({
      success: false,
      error: 'Failed to initialize server',
      message: err.message,
      stack: err.stack,
    });
  });
}

module.exports = app;
