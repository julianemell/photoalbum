const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos_controller');
const photosValidationRules = require('../validation/photo');

/* Get all resources */
router.get('/', photosController.getPhotos);

/* Get a specific resource */
router.get('/:photoId', photosController.showPhoto);

/* Store a new resource */
router.post('/', photosValidationRules.createRules, photosController.storePhoto);

/* Update a specific resource */
router.put('/:photoId', photosValidationRules.updateRules, photosController.updatePhoto);

module.exports = router;
