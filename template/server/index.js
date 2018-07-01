import express from 'express';
import pkg from '../package.json';

import example from './api/example';

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
