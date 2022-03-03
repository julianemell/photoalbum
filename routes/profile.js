const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
const profileValidationRules = require('../validation/profile');

//get auth users profile
router.get('/', profileController.getProfile);

router.put('/', profileValidationRules.updateRules, profileController.updateProfile);

router.get('/albums', profileController.getAlbums);
router.get('/photos', profileController.getPhotos);


module.exports = router;
