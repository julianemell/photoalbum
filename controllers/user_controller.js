const debug = require('debug')('photoalbum:user_controller');
const { User, Album } = require('../models');
const { matchedData, validationResult } = require('express-validator');


const getAlbums = async (req, res) => {
	await req.user.load('albums');
 
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

/* 
module.exports = {

	getAlbums,
	getPhotos,
	
}
 */