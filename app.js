const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const { body, matchedData, validationResult } = require('express-validator');

// instantiate express
const app = express();

// middlewares
app.use(logger('dev'));
app.use(cors()); //så att andra tjänster kan använda detta api
app.use(express.json()); //tolka jsondata. gör det möjligt att använda req.body.
app.use(express.urlencoded({ extended: false }));


// routes (använd alla routes som finns i routes-mappen)
app.use(require('./routes'));

module.exports = app;
