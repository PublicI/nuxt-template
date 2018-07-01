const express = require('express');
const pkg = require('../package.json');

const example = require('./api/example');

const app = express();

app.get('/', (req, res) => {
    res.redirect('/' + pkg.name + '/');
});

// Import API Routes
app.use('/api', example);

// Export the server middleware
module.exports = {
    path: '/',
    handler: app
};
