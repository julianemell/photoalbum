const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register_controller');
//const authController = require('../controllers/auth_controller');
const auth = require('../middlewares/auth');
const userValidationRules = require('../validation/profile');



//GET /
router.get('/', (req, res, next) => {
	res.send({ 
		success: true, 
		data: { msg: 'oh, hi' }
	});
});
//POST
router.post('/register', userValidationRules.createRules, registerController.register);
//router.post('/login', authController.login);

//router.use(auth.basic);
router.use('/albums', require('./albums'));
router.use('/photos', require('./photos'));
router.use('/profile', auth.basic, require('./profile'));


module.exports = router;
