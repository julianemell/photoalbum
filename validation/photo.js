// Photo validation rules

const { body } = require('express-validator'); 

const createRules = [
    body('title').exists().isLength({min: 2}),
    body('url').exists().isURL().isLength({min: 2}),
    body('comment').optional().isLength({min: 2})
];

const updateRules = [
    body('title').optional().isLength({min: 2}),
    body('url').optional().isURL().isLength({min: 2}),
    body('comment').optional().isLength({min: 2})
];

module.exports = { //dessa nås i userValidationRules i routes/photos
    createRules,
    updateRules
}