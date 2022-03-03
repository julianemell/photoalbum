//Authentication

const debug = require('debug')('photoalbum:auth');
const { User } = require('../models/');
const bcrypt = require('bcrypt');

const basic = async (req, res, next) => {
    debug("Hello");

    if (!req.headers.authorization) {
        debug("Authorization header missing");

        return res.status(401).send({
            status: 'fail',
            data: 'Authorization required',
        });
    }

    debug("Authorization header: %o", req.headers.authorization);

    const [authSchema, base64Payload] = req.headers.authorization.split(' ');
 
    if (authSchema.toLowerCase() !== "basic") {
        debug("Authorization schema isn't basic");
 
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization required',
        });
    }
    //från base64 till ascii
    const decodedPayload = Buffer.from(base64Payload, 'base64').toString('ascii');

    const [email, password] = decodedPayload.split(':');
 
    const user = await new User({ email }).fetch({ require: false });
    if (!user) {
        return res.status(401).send({
            status: 'fail',
            data: 'Authorization failed',
        });
    }

    const hash = user.get('password');

	const result = await bcrypt.compare(password, hash);
	if (!result) {
		return res.status(401).send({
			status: 'fail',
			data: 'Authorization failed here',
		});
	}

    req.user = user;

   next();
}

module.exports = {
    basic,
}