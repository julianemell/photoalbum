// Album validation rules

const { body, matchedData } = require('express-validator'); 

const createRules = [
    body('title').exists().isLength({min: 2})
];

const updateRules = [
    body('title').optional().isLength({min: 2})
];

module.exports = { //dessa nås i userValidationRules i routes/album
    createRules,
    updateRules
}