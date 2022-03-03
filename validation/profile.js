// User validation rules

const { body } = require('express-validator'); 

const createRules = [
    body('email').exists().isLength({min: 3}),
    body('password').exists().isLength({min: 4}),
    body('first_name').exists().isLength({min: 2}),
    body('last_name').exists().isLength({min: 2}),
];

const updateRules = [
    body('email').optional().isLength({min: 3}),
    body('password').optional().isLength({min: 4}),
    body('first_name').optional().isLength({min: 2}),
    body('last_name').optional().isLength({min: 2}),
];

module.exports = { //dessa nås i userValidationRules i routes/profile
    createRules,
    updateRules
}