const debug = require('debug')('photoalbum:photos_controller');
const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get all photos
 * GET /
 */
const getPhotos = async (req, res) => {
	const all_photos = await models.Photos.fetchAll();

	res.send({
		status: 'success',
		data: {
			photos: all_photos,
		}
	});
}

/**
 * Get a specific photo
 *
 * GET /:photosId
 */
 const showPhoto = async (req, res) => {
	const photo = await new models.Photo({ id: req.params.photosId })
		.fetch();

	res.send({
		status: 'success',
		data: {
			photo,
		}
	});	
}


/**
 * Store a new photo
 *
 * POST /
 */
 const storePhoto = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const photo = await new models.Photos(validData).save();
		debug("Created new photo successfully: %O", photo);

		res.send({
			status: 'success',
			data: photo,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new photo.',
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