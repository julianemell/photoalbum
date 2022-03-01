const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register_controller');
//const auth = require('../middlewares/auth');
//const userValidationRules = require('../validation/user');



/* GET / */
router.get('/', (req, res) => {
	res.send({ 
		success: true, 
		data: { msg: 'oh, hi' }
	});
});

router.use('/profile', require('./profile'));
router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));

//POST
router.post('/register', /* userValidationRules.createRules, */ registerController.register);

module.exports = router;
