const express = require('express');

const example = require('./api/example');

const app = express();

// Import API Routes
app.use(example);

// Export the server middleware
module.exports = {
    path: '/api',
    handler: app
};
