const express = require('express');
const routes = require('./routes');

const app = express();

routes(app);

// error global handling
app.use((err, req, res, next) => {
    res.status(err.statusCode);
    res.json({
        status: 'error',
        message: err.message
    });
});

module.exports = app;