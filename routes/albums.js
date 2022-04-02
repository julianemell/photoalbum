const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const albumValidationRules = require('../validation/album');

/* Get all album */
router.get('/', albumController.getAlbums);

/* Get a specific album */
router.get('/:albumId', albumController.showAlbum);

/* Store a new album */
router.post('/', albumValidationRules.createRules, albumController.storeAlbum);

/* Store a photo to an album */
router.post('/:albumId/photos', albumController.addPhotoToAlbum);

/* Update a specific album */
router.put('/:albumId', albumValidationRules.updateRules, albumController.updateAlbum);


module.exports = router;
