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

app.post('/test', [
    body('name').exists().isLength({min: 3}), //regler att validera mot
    body('address').exists().isString().trim().isLength({min: 6, max: 50}), //måste vara en sträng och sedan trimmar vi bort mellanslag. istället för exists kan vi ha .optional

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({ status: 'fail', data: errors.array() });
    }

    const validData = matchedData(req); //kollar så att vi får ut just den datan som vi har validerat

    res.send({ status: 'success', data: validData})
});

// routes (använd alla routes som finns i routes-mappen)
app.use(require('./routes'));

module.exports = app;
