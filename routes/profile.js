const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
//const profileValidationRules = require('../validation/profile');

/* Get all resources */
router.get('/', profileController.getUser);

/* Get a specific resource */
//router.get('/:userId', profileController.showUser);

/* Store a new resource */
//router.post('/', profileValidationRules.createRules, profileController.storeUser);

/* Update a specific resource */
//router.put('/:exampleId', profileValidationRules.updateRules, profileController.updateUser);

/* Destroy a specific resource */
//router.delete('/:exampleId', profileController.destroy);

module.exports = router;
