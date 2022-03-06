// User validation rules

const { ModelBase } = require('bookshelf');
const { body } = require('express-validator');
const models = require('../models');

const createRules = [
    body('email').exists().isString().isEmail().trim().isLength({min: 3}).custom(async value => {
        const user = await new models.User({ email: value }).fetch({ require: false });
        if (user) {
            return Promise.reject("A user with that email already exists");
        }
        return Promise.resolve();
    }),
    body('password').exists().isString().isLength({min: 6}),
    body('first_name').exists().isString().isLength({min: 3}),
    body('last_name').exists().isString().isLength({min: 3}),
];
/* 
const updateRules = [
    body('email').optional().isLength({min: 3}),
    body('password').optional().isLength({min: 4}),
    body('first_name').optional().isLength({min: 2}),
    body('last_name').optional().isLength({min: 2}),
]; */

module.exports = { //dessa nås i userValidationRules i routes/profile
    createRules,
}