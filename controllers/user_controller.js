const debug = require('debug')('photoalbum:user_controller');
const models = require('../models/User');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get user profile
 * GET /
 */
/* const getProfile = async (req, res) => {
	res.send({
		status: 'success',
		data: { //visa endast name och username
			name: req.user.get('first_name') + ' ' + req.user.get('last_name'),
			username: req.user.get('email'),
		}
	});
}
 */
/* 
const updateProfile = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	// update the user's password, but only if they sent us a new password
	if (validData.password) {
		try {
			validData.password = await bcrypt.hash(validData.password, models.User, 10); //saltat 10 ggr

		} catch (error) {
			res.status(500).send({
				status: 'error',
				message: 'Exception thrown when hashing the password.',
			});
			throw error;
		}
	}

	try {
		const updatedUser = await req.user.save(validData);
		debug("Updated user successfully: %O", updatedUser);

		res.send({
			status: 'success',
			data: {
				user: updatedUser,
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new user.',
		});
		throw error;
	}
}
 */
const getAlbums = async (req, res) => {
	await req.user.load('album');
 
	res.status(200).send({
		status: 'success',
		data: {
			books: req.user.related('album'),
		},
	});
}

const getPhotos = async (req, res) => {
	await req.user.load('photos');
 
	res.status(200).send({
		status: 'success',
		data: {
			books: req.user.related('photos'),
		},
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
    getProfile,
	/* updateProfile, */
	getAlbums,
	getPhotos,
	addPhoto,
}