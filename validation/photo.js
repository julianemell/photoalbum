// Photo validation rules

const { body } = require('express-validator'); 

const createRules = [
    body('title').exists().isString().isLength({min: 3}),
    body('url').exists().isURL().isLength({min: 6}),
    body('comment').optional().isLength({min: 3})
];

const updateRules = [
    body('title').optional().isString().isLength({min: 3}),
    body('url').optional().isURL().isLength({min: 6}),
    body('comment').optional().isLength({min: 3})
];

module.exports = {
    createRules,
    updateRules
}