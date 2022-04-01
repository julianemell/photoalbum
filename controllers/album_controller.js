const debug = require('debug')('photoalbum:album_controller');
const models = require('../models');
const { matchedData, validationResult } = require('express-validator');


/**
 * Get all albums - funkar ej
 * GET /
 */
const getAlbums = async (req, res) => {
	await req.user.load('albums');
	res.status(200).send({
		status: 'success',
		data: {
			album: req.user.related('albums'),
		}
	});
}


/**
 * Get a specific album for the user
 * GET /:albumId
 */
const showAlbum = async (req, res) => {
	try {
		const validData = matchedData(req);
		validData.user_id = req.user.get('id');
		const album = await new Album({ id: req.params.albumId, user_id: validData.user_id }).fetch({ require: false });

		if(!album) {
			res.send({
				status: 'fail',
				data: 'cant find album'
			})
			return;	
		}
		res.send({
			status: 'success',
			data: album,
		})
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when trying to show album.',
		});
		throw error;
	}
}


/**
 *
 * Store a new album
 * POST /
 */
 const storeAlbum = async (req, res) => {
	//hämta användarens id
	const validData = matchedData(req);
	validData.user_id = req.user.get('id');
	console.log("här har vi validData:", validData);

	// check for any validation errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).send({ status: 'fail', data: errors.array() });
	}

	try {
		const album = await new Album(validData).save();
		debug("Added album to user successfully: %O", album);

		res.send({
			status: 'success',
			data: {
				id: album.get('id'),
				title: album.get('title'),
				user_id: req.user.get('id'),
			},
		});

	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a album to a user.',
		});
		throw error;
	}
}

/**
 *
 * Update a specific album
 * PUT /:albumId
 */
 const updateAlbum = async (req, res) => {
	const albumId = req.params.photosId;
	const validData = matchedData(req);
	validData.user_id = req.user.get('id');

	// make sure album exists
	const album = await new Album({ id: req.params.albumId, user_id: validData.user_id }).fetch({ require: false });
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


/**
 *
 * Add photo to album - säger success men det läggs inte till.
 * POST /:albumId/photos
 */

const addPhotoToAlbum = async (req, res) => {
	const validData = matchedData(req);
	validData.user_id = req.user.get('id');

	try {
		//plocka ut albumet
		const album = await new Album({ id: req.params.albumId, user_id: validData.user_id }).fetch({ require: false });
		console.log("validdata?", validData.photo_id);
		//ta photo_id och lägg till i validData, som en relation
		await album.photos().attach(validData.photo_id);
		//debug("Added photo to album successfully: %o", result);
		await album.related('photos').fetch();
		res.send({
			status: 'success',
			data: album,
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when adding a photo to an album.',
		});
		throw error;
	}
}


module.exports = {
    getAlbums,
	showAlbum,
	storeAlbum,
	updateAlbum,
	addPhotoToAlbum,
}