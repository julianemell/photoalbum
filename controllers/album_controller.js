const debug = require('debug')('photoalbum:album_controller');
const { Album, User } = require('../models');
const { matchedData, validationResult } = require('express-validator');

/**
 * Get all albums
 * GET /
 */
const getAlbums = async (req, res) => {
	const user = await User({ id: req.params.usersId }).fetch( { withRelated: ['albums'] });

	//const user = await User.fetchById(req.users.user_id, { withRelated: ['albums'] });
	//const all_albums = await models.Album.fetchAll();
	
	try {
		const albums = user.related('albums');
		res.status(200).send({
			status: 'success',
			data: albums
		});
	} catch (error) {
		res.status(500).send({
			status: 'error',
			message: 'Exception thrown in database when getting the albums.',
		});

		throw error;
	}
}	
/* // get only the validated data from the request
const validData = matchedData(req);

validData.userId = req.user.get('id');

//await req.user.load(['albums']);
const usersAlbums = await new models.Album(validData).save();

res.status(200).send({
	status: 'success',
	data: {
		album: user.related,
	},
}); */


/**
 * Get a specific album
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

	//
	validData.user_id = req.user.get('id'); //hämta ut id på den som är inloggad och lägg in det i validData parameter user_id

	console.log(validData);

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
    getAlbums,
	showAlbum,
	storeAlbum,
	updateAlbum,
}