const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profile_controller');
//const profileValidationRules = require('../validation/profile');

/* Get all resources */
router.get('/', profileController.getProfile);

/* Get a specific resource */
//router.get('/:userId', profileController.show);

/* Store a new resource */
//router.post('/', profileValidationRules.createRules, profileController.store);

/* Update a specific resource */
//router.put('/:exampleId', profileValidationRules.updateRules, profileController.update);

/* Destroy a specific resource */
//router.delete('/:exampleId', profileController.destroy);

module.exports = router;
