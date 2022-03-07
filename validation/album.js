// Album validation rules

const { body } = require('express-validator');
const models = require('../models');

const createRules = [
    body('title').exists().isLength({min: 2}),
    body('user_id').exists().bail().custom(async value => { //value är det som skickas med/skriver i postm
		const user = await new models.User({ id: value }).fetch({ require: false });
		if (!user) {
			return Promise.reject(`User with ID ${value} does not exist. You must log in.`);
		}

		return Promise.resolve();
	})
];

const updateRules = [
    body('title').optional().isLength({min: 2})
];

module.exports = { //dessa nås i userValidationRules i routes/album
    createRules,
    updateRules
}