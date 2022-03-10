// Album validation rules

const { body } = require('express-validator');
const models = require('../models');

const createRules = [
    body('title').exists().isLength({min: 3}),
    body('user_id').optional().bail().custom(async value => {
		const user = await new models.User({ id: value }).fetch({ require: false });
		if (!user) {
			return Promise.reject(`User with ID ${value} does not exist. You must log in.`);
		}

		return Promise.resolve();
	})
];

const updateRules = [
    body('title').optional().isLength({min: 3})
];

const photoRules = [
	body('photo_id').exists().isInt().bail().custom(async value => {
		const photo = await new models.Photo({ id: value }).fetch({ require: false });
		if (!photo) {
			return Promise.reject(`Photo with ID ${value} does not exist.`);
		}

		return Promise.resolve();
	})
]

module.exports = {
    createRules,
    updateRules,
	photoRules
}