const debug = require('debug')('photoalbum:profile_controller');
const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get user profile
 * GET /
 */
const getUser = async (req, res) => {
	//get the auth user 
	//and return it
	console.log("hello", req.user);

	res.send({
		status: 'success',
		data: {
			users: req.user,
		}
	});
}

//eller ska denna vara i album_controller?
const addPhoto = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	// lazy-load book relationship
	await req.user.load('photos');

	// get the user's books
	const photos = req.user.related('photos');

	// check if book is already in the user's list of books
	const existing_photo = photos.find(photo => photo.id == validData.photo_id);

	// if it already exists, bail
	if (existing_photo) {
		return res.send({
			status: 'fail',
			data: 'Photo already exists.',
		});
	}

	try {
		const result = await req.user.photos().attach(validData.photo_id);
		debug("Added photo to user successfully: %O", result);

		res.send({
			status: 'success',
			data: null,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a photo to a user.',
		});
		throw error;
	}
}

module.exports = {
    getUser,
	addPhoto,
}