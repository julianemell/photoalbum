const debug = require('debug')('photoalbum:photos_controller');
const { User, Photos } = require('../models');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get all photos - funkar ej
 * GET /
 */
const getPhotos = async (req, res) => {
	await req.user.load('photos');
	res.status(200).send({
		status: 'success',
		data: {
			album: req.user.related('photos'),
		}
	});
}

/**
 *
 * Get a specific photo
 * GET /:photosId
 */
const showPhoto = async (req, res) => {
	try {
		const validData = matchedData(req);
		validData.user_id = req.user.get('id');

		const photo = await new Photos({ id: req.params.photoId, user_id: validData.user_id }).fetch({ require: false });

		if(!photo) {
			res.send({
				status: 'fail',
				data: 'cant find photo'
			})
			return;	
		}
		res.send({
			status: 'success',
			data: {
				id: photo.get('id'),
				title: photo.get('title'),
				url: photo.get('url'),
				comment: photo.get('comment'),
			}
		})
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when trying to show photo.',
		});
		throw error;
	}
}


/**
 *
 * Store a new photo
 * POST /
 */

const storePhoto = async (req, res) => {
	//hämta användarens id
	const validData = matchedData(req);
	validData.user_id = req.user.get('id');

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	try {
		const photo = await new Photos(validData).save();
		debug("Added photo to user successfully: %O", photo);

		res.send({
			status: 'success',
			data: {
				title: photo.get('title'),
				url: photo.get('url'),
				comment: photo.get('comment'),
				user_id: req.user.get('id'),
				id: photo.get('id'),
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a photo to a user.',
		});
		throw error;
	}
}
/**
 *
 * Update a specific photo
 * PUT /:photosId
 */
 const updatePhoto = async (req, res) => {
	const photoId = req.params.photosId;
	const validData = matchedData(req);
	validData.user_id = req.user.get('id');

	// make sure photo exists
	const photo = await new Photos({ id: req.params.photoId, user_id: validData.user_id }).fetch({ require: false });
	if (!photo) {
		debug("Photo to update was not found. %o", { id: photoId });
		res.status(404).send({
			status: 'fail',
			data: 'Photo Not Found',
		});
		return;
	}

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	try {
		const updatedPhoto = await photo.save(validData);
		debug("Updated photo successfully: %O", updatedPhoto);

		res.send({
			status: 'success',
			data: photo,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new photo.',
		});
		throw error;
	}
}


module.exports = {
    getPhotos,
	showPhoto,
	storePhoto,
	updatePhoto,
}