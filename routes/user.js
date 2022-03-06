/* const express = require('express');
const router = express.Router();
const profileController = require('../controllers/user_controller');
const profileValidationRules = require('../validation/user');
const photosValidationRules = require('../validation/photo');


//get auth users profile
router.get('/', profileController.getProfile);

router.put('/', profileValidationRules.updateRules, profileController.updateProfile);

router.get('/albums', profileController.getAlbums);
router.get('/photos', profileController.getPhotos);
//router.post('/', photosValidationRules.createRules, profileController.addPhoto);


module.exports = router;
 */