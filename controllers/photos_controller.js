const debug = require('debug')('photoalbum:photos_controller');
const { User, Photos } = require('../models');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get all photos
 * GET /
 */
const getPhotos = async (req, res) => {
	try {
		const validData = matchedData(req);
		validData.user_id = req.user.get('id');

		const photos = await new Photos({ user_id: validData.user_id }).fetch({ require: false });

		if(!photos) {
			res.send({
				status: 'fail',
				data: 'cant find photos'
			})
			return;	
		}
		res.send({
			status: 'success',
			data: photos,
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when trying to show photos.',
		});
		throw error;
	}
}

/**
 * Get a specific photo
 *
 * GET /:photosId
 */
const showPhoto = async (req, res) => {
	try {
		const validData = matchedData(req);
		validData.user_id = req.user.get('id');
		console.log('är detta fotots id?:', req.params.photoId)
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
			data: photo,
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
 * Store a new photo
 *
 * POST /
 */

//eller ska denna vara i album_controller?
const storePhoto = async (req, res) => {
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
/**
 * Update a specific photo
 *
 * PUT /:photosId
 */
 const updatePhoto = async (req, res) => {
	const photosId = req.params.photosId;

	// make sure example exists
	const photo = await new models.Photo({ id: photosId }).fetch({ require: false });
	if (!photo) {
		debug("Photo to update was not found. %o", { id: photosId });
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

	// get only the validated data from the request
	const validData = matchedData(req);

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