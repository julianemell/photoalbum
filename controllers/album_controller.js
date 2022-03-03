const debug = require('debug')('photoalbum:album_controller');
const models = require('../models');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get all albums
 * GET /
 */
const getAlbum = async (req, res) => {
	const all_albums = await models.Album.fetchAll();

	res.send({
		status: 'success',
		data: {
			album: all_albums,
		}
	});
}


/**
 * Get a specific album
 * GET /:albumId
 */
 const showAlbum = async (req, res) => {
	const album = await new models.Album({ id: req.params.albumId }).fetch({ withRelated: ['photos'] });

	res.send({
		status: 'success',
		data: album,
	});
}


/**
 * Store a new album
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
 * Update a specific album
 *
 * PUT /:albumId
 */
 const updateAlbum = async (req, res) => {
	const albumId = req.params.photosId;

	// make sure album exists
	const album = await new models.Album({ id: albumId }).fetch({ require: false });
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
	showAlbum,
	storeAlbum,
	updateAlbum,
}