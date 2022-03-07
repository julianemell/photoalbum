const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register_controller');
const auth = require('../middlewares/auth');
const userValidationRules = require('../validation/user');



//GET /
router.get('/', (req, res, next) => {
	res.send({ 
		success: true, 
		data: { msg: 'hi! please register as a user at /register to go forward' }
	});
});
//POST
router.post('/register', userValidationRules.createRules, registerController.register);

//här måste man gå genom auth för att komma in
router.use('/albums', auth.basic, require('./albums'));
router.use('/photos', auth.basic, require('./photos'));


module.exports = router;
