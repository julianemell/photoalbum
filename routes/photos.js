const express = require('express');
const router = express.Router();
const photosController = require('../controllers/photos_controller');
//const photosValidationRules = require('../validation/photos');

/* Get all resources */
router.get('/', photosController.getPhotos);

/* Get a specific resource */
router.get('/:photosId', photosController.showPhoto);

/* Store a new resource */
router.post('/',/*  photosValidationRules.createRules, */ photosController.storePhoto);

/* Update a specific resource */
router.put('/:photosId',/*  photosValidationRules.updateRules, */ photosController.updatePhoto);

module.exports = router;
