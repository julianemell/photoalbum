const debug = require('debug')('photoalbum:album_controller');
const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get user profile
 * GET /
 */
const getAlbum = async (req, res) => {
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


/**
 * Get a specific photo
 *
 * GET /:photosId
 */
 const showAlbum = async (req, res) => {
	const album = await new models.Album({ id: req.params.albumId })
		.fetch();

	res.send({
		status: 'success',
		data: album,
	});
}


/**
 * Store a new photo
 *
 * POST /
 */
 const storeAlbum = async (req, res) => {
	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	// get only the validated data from the request
	const validData = matchedData(req);

	try {
		const album = await new models.Album(validData).save();
		debug("Created new album successfully: %O", album);

		res.send({
			status: 'success',
			data: album,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when creating a new album.',
		});
		throw error;
	}
}

/**
 * Update a specific photo
 *
 * PUT /:photosId
 */
 const updateAlbum = async (req, res) => {
	const albumId = req.params.photosId;

	// make sure example exists
	const album = await new models.Photos({ id: albumId }).fetch({ require: false });
	if (!album) {
		debug("Album to update was not found. %o", { id: albumId });
		res.status(404).send({
			status: 'fail',
			data: 'Album Not Found',
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
		const updatedAlbum = await album.save(validData);
		debug("Updated album successfully: %O", updatedAlbum);

		res.send({
			status: 'success',
			data: album,
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when updating a new album.',
		});
		throw error;
	}
}


module.exports = {
    getAlbum,
}